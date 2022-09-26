import { Document, Schema } from "mongoose";
export default interface Message extends Document {
  content: string;
  sender: string;
  sender_id: Schema.Types.ObjectId;
  room: string;
  room_id: Schema.Types.ObjectId;
}
