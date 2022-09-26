import { Document, Schema } from "mongoose";

export default interface User extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  username: string;
  password: string;
  rooms_owned: Schema.Types.ObjectId[];
  rooms_joined: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
  role: string;
  isValidPassword(password: string): Promise<Error | boolean>;
}
