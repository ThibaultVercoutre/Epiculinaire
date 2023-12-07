import { model, Schema, Model, Types } from "mongoose";

const PlatSchema: Schema = new Schema(
  {
    platname: {
      type: String,
      required: true,
    },
    typename: {
      type: String,
      required: true,
    },
  }
);

const PlatCommandeSchema: Schema = new Schema(
  {
    platname: {
      type: String,
      required: true,
    },
    typename: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  }
);

export interface IIPlat {
    _id: Types.ObjectId;
    platname: string;
    typename: string;
}

export interface IIPlatCommande {
    _id: Types.ObjectId;
    platname: string;
    typename: string;
    price: number;
    date: Date;
}

export interface IPlat extends Omit<IIPlat, "_id">, Document {}

export interface IPlatCommande extends Omit<IIPlatCommande, "_id">, Document {}

export const Plat = model<IPlat, Model<IPlat>>("Plat", PlatSchema, "plats");

export const PlatCommande = model<IPlatCommande, Model<IPlatCommande>>("PlatCommande", PlatCommandeSchema, "platscommandes");