import { model, Schema, Model, Types } from "mongoose";
import { TableEtat, ITableEtat } from "../models/table.model.js";

const ServeurAffectationSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    serveur_name: {
      type: String,
      required: true,
    },
    tables: [ TableEtat.schema ]
  }
);

export interface IIServeurAffectation {
    _id: Types.ObjectId;
    serveur_name: string;
    tables: ITableEtat[];
}

export interface IServeurAffectation extends Omit<IIServeurAffectation, "_id">, Document {}

export const ServeurAffectation = model<IServeurAffectation, Model<IServeurAffectation>>("ServeurAffectation", ServeurAffectationSchema, "ServeurAffectation");