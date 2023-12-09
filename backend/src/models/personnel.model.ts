import { model, Schema, Model, Types } from "mongoose";

const PersonnelSchema: Schema = new Schema(
  {
    id_personnel: {
        type: Number,
        required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
        type: String,
        required: true,
    },
  }
);

export interface IIPersonnel {
    _id: Types.ObjectId;
    id_user: number;
    name: string;
    type: string;
}

export interface IPersonnel extends Omit<IIPersonnel, "_id">, Document {}

export const Personnel = model<IPersonnel, Model<IPersonnel>>("Personnel", PersonnelSchema, "personnel");