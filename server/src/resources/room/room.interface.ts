import { Document, Schema } from "mongoose";
export default interface Room extends Document {
  name: string;
  description: string;
  isPrivate: boolean;
  password: string | null;
  owner: Schema.Types.ObjectId;
  moderators: Schema.Types.ObjectId[];
  active_users: Schema.Types.ObjectId[];
  active_users_length: number;
  allowed_access: Schema.Types.ObjectId[];
  allowed_access_length: number;
  banned_users: Schema.Types.ObjectId[];
  isValidPassword(password: string): Promise<Error | boolean>;
}
