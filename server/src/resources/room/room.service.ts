import User from "../user/user.interface";
import UserModel from "../user/user.model";
import Room from "./room.interface";
import RoomModel from "./room.model";
import Message from "../message/message.interface";
import MessageModel from "../message/message.model";

class UserService {
  public async getRooms(
    filter: string = "",
    limit: number = 30
  ): Promise<any | Error> {
    const rooms = await RoomModel.find({
      isPrivate: false,
      name: { $regex: new RegExp(filter), $options: "i" },
    })
      .select({
        _id: 0,
        name: 1,
        description: 1,
        active_users_length: 1,
        allowed_access_length: 1,
        password: 1,
      })
      .sort({
        allowed_access_length: -1,
      })
      .limit(limit);
    return rooms.map((room) => {
      //using spread operator pulls meta properties
      const {
        name,
        description,
        active_users_length,
        allowed_access_length,
        password,
      } = room;
      const hasPassword = !(password === "");
      const r = {
        name,
        description,
        active_users_length,
        allowed_access_length,
        hasPassword,
      };
      return r;
    });
  }
  public async getMessages(
    room: string,
    limit: number = 30
  ): Promise<Message[]> {
    const roomId = await RoomModel.findOne({ name: room }).select({ _id: 1 });
    const messages = await MessageModel.find({ room_id: roomId?._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select({ _id: 0, sender: 1, room: 1, content: 1, createdAt: 1 });
    return messages;
  }
  public async getActiveUsers(roomName: string): Promise<object[]> {
    const room = await RoomModel.findOne({ name: roomName }).select({
      _id: 0,
      active_users: 1,
    });
    if (!room) {
      throw new Error("Room doesn't exist.");
    }
    const users = (
      await room.populate("active_users", {
        _id: 0,
        username: 1,
        role: 1,
      })
    ).active_users;

    return users;
  }
  public async createRoom(
    user: User,
    name: string,
    description: string = "",
    password: string = "",
    isPrivate: boolean = false
  ): Promise<Room> {
    const roomCheck = await RoomModel.findOne({ name });
    if (roomCheck) {
      throw new Error("Name is taken.");
    }
    const room = await RoomModel.create({
      name,
      description,
      password,
      isPrivate,
      owner: user._id,
      moderators: [user._id],
      allowed_access: [user._id],
      allowed_access_length: 1,
    });
    await user.updateOne({
      $addToSet: { rooms_joined: room?._id, rooms_owned: room?._id },
    });

    return room;
  }
  public async deleteRoom(
    user: User,
    name: string,
    password: string
  ): Promise<boolean> {
    const room = await RoomModel.findOne({ name });
    if (!room) {
      throw new Error("Room doesn't exist.");
    }
    if (String(room.owner) !== String(user._id)) {
      throw new Error("Not allowed.");
    }

    if (await room.isValidPassword(password)) {
      await room.delete();
    } else {
      throw new Error("Wrong password.");
    }

    return true;
  }
  public async addToRoom(
    user: User,
    roomName: string,
    usernames: string[]
  ): Promise<string[]> {
    const room = await RoomModel.findOne({ name: roomName });
    if (!room) {
      throw new Error("Room doesn't exist.");
    }
    if (String(room.owner) !== String(user._id)) {
      throw new Error("Not allowed.");
    }

    let successfullyAdded = [];
    for (let username of usernames) {
      const usernameCheck = await UserModel.findOne({ username });
      if (!usernameCheck) continue;
      await Promise.all([
        room.updateOne({
          $addToSet: { allowed_access: usernameCheck._id },
          $inc: { allowed_access_length: 1 },
        }),
        usernameCheck.updateOne({ $addToSet: { rooms_joined: room?._id } }),
      ]);

      successfullyAdded.push(username);
    }

    return successfullyAdded;
  }
  public async joinRoom(
    user: User,
    roomName: string,
    password: string = ""
  ): Promise<boolean> {
    const room = await RoomModel.findOne({ name: roomName });
    if (!room || room.isPrivate) {
      throw new Error("Room doesn't exist.");
    }

    const addJoiningDataToDb = () =>
      Promise.all([
        room.updateOne({
          $addToSet: { allowed_access: user._id },
          $inc: { allowed_access_length: 1 },
        }),
        user.updateOne({
          $addToSet: { rooms_joined: room?._id },
        }),
      ]);

    if (room?.password) {
      if (await room.isValidPassword(password)) {
        await addJoiningDataToDb();
      } else {
        throw new Error("Wrong password.");
      }
    } else {
      await addJoiningDataToDb();
    }

    return true;
  }
  public async leaveRoom(user: User, roomName: string): Promise<boolean> {
    const room = await RoomModel.findOne({ name: roomName });
    if (!room) {
      throw new Error("Room doesn't exist.");
    }
    const isUserInRoom = user.rooms_joined.find(
      (roomId) => String(roomId) === String(room._id)
    );
    if (!isUserInRoom) {
      throw new Error("Room not joined.");
    }

    await Promise.all([
      room.updateOne({
        $pull: { allowed_access: user._id },
        $inc: { allowed_access_length: -1 },
      }),
      user.updateOne({
        $pull: { rooms_joined: room?._id },
      }),
    ]);

    return true;
  }
}

export default UserService;
