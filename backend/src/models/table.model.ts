import { model, Schema, Model, Types } from "mongoose";

const TableSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    taille: {
      type: Number,
      required: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    rotation: {
        type: Number,
        required: true,
    },
  }
);

export interface IITable {
    _id: Types.ObjectId;
    id: number;
    taille: number;
    x: number;
    y: number;
    rotation: number;
}

export interface ITable extends Omit<IITable, "_id">, Document {}

export const Table = model<ITable, Model<ITable>>("Table", TableSchema, "Table");