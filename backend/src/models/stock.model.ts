import { model, Schema, Model, Types } from "mongoose";

const StockSchema: Schema = new Schema(
  {
    id: {
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
    quantity: {
        type: Number,
        required: true,
    },
  }
);

export interface IIStock {
    _id: Types.ObjectId;
    id: number;
    name: string;
    type: string;
    quantity: string;
}

export interface IStock extends Omit<IIStock, "_id">, Document {}

export const Stock = model<IStock, Model<IStock>>("Stock", StockSchema, "Stock");