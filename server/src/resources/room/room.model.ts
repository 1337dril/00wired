import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Room from "./room.interface";

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    active_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    active_users_length: {
      type: Number,
      default: 0,
    },
    allowed_access: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    allowed_access_length: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moderators: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    banned_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    password: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RoomSchema.index({ name: "text", description: "text" });

RoomSchema.pre<Room>("save", async function (next) {
  if (!this.password) {
    return next();
  }
  if (!this.isModified("password")) {
    return next();
  }

  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

RoomSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<Room>("Room", RoomSchema);
