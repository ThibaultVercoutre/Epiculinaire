import { model, Schema, Model, Types } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    id_user: {
        type: Types.ObjectId,
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
    },
  }
);

export interface IIUser {
    id_user: Types.ObjectId;
    name: string;
    password: string;
}

export interface IUser extends Omit<IIUser, "_id">, Document {}

export const User = model<IUser, Model<IUser>>("User", UserSchema, "users");