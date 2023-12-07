import { model, Schema, Model, Types } from "mongoose";

const AlimentSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    name_aliment: {
      type: String,
      required: true,
    },
    name_plat: {
      type: String,
      required: true,
    },
  }
);

export interface IIAliment {
    _id: Types.ObjectId;
    id: number;
    name_aliment: string;
    serveur_name: string;
}

export interface IAliment extends Omit<IIAliment, "_id">, Document {}

export const Aliment = model<IAliment, Model<IAliment>>("Aliment", AlimentSchema, "Aliment");