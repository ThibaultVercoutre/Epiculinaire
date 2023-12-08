import { model, Schema, Model, Types } from "mongoose";

const FinanceSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    id_reservation: {
      type: Number,
      required: true,
    },
    montant_virement: {
        type: Number,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
  }
);

export interface IIFinance {
    _id: Types.ObjectId;
    id: number;
    id_reservation: number;
    montant_virement: number;
    type: number;
    date: string;
}

export interface IFinance extends Omit<IIFinance, "_id">, Document {}

export const Finance = model<IFinance, Model<IFinance>>("Finance", FinanceSchema, "Finance");