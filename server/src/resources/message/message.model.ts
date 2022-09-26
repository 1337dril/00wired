import { Schema, model } from "mongoose";
import Message from "./message.interface";

const MessageSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sender: {
      type: String,
    },
    room_id: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    room: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Message>("Message", MessageSchema);
