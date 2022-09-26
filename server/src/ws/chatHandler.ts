import { Server, Socket } from "socket.io";
import Room from "../resources/room/room.model";
import Message from "../resources/message/message.model";

enum Events {
  NEW_MESSAGE = "new-message-event",
  JOIN_ROOM = "join-room-event",
}

export default function (io: Server, socket: Socket) {
  const joinRoomHandler = async (roomName: string) => {
    socket.join(roomName);
    await Room.findOneAndUpdate(
      { name: roomName },
      { $addToSet: { active_users: socket.data.user._id } }
    );
  };
  const newMessageHandler = async ({ messageBody, roomName }: any) => {
    const room = await Room.findOne({ name: roomName });
    if (!room) {
      throw new Error("room not found");
    }
    // handle socket
    const message = {
      content: messageBody,
      createdAt: Date.now(),
      sender: socket.data.user.username,
      room: roomName,
    };
    socket.broadcast.to(roomName).emit(Events.NEW_MESSAGE, message);

    // handle db
    const payload = await Message.create({
      sender_id: socket.data.user._id,
      sender: socket.data.user.username,
      content: messageBody,
      room_id: room._id,
      room: room.name,
    });
    await Room.findByIdAndUpdate(room._id, {
      $push: {
        messages: payload._id,
      },
    });
  };
  socket.on(Events.JOIN_ROOM, joinRoomHandler);
  socket.on(Events.NEW_MESSAGE, newMessageHandler);
  // const socketTest2 = socketHandler2(io, socket);
  // socket.on("socket:ping2", socketTest2);
}

// function socketHandler2(io: Server, socket: Socket) {
//   return () => {};
// }
