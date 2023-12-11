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

const PlatMenuSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    platname: {
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

const PlatEnPreparationSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    id_table: {
      type: Number,
      required: true,
    },
    etat: {
      type: String,
      required: true,
    },
  }
);

export interface IIPlat {
    _id: Types.ObjectId;
    platname: string;
    typename: string;
}

export interface IIPlatMenu {
    _id: Types.ObjectId;
    id: number;
    platname: string;
}

export interface IIPlatCommande {
    _id: Types.ObjectId;
    platname: string;
    typename: string;
    price: number;
    date: Date;
}

export interface IIPlatEnPreparation {
  _id: Types.ObjectId;
  id: number;
  name: string;
  id_table: number;
  etat: string;
}

export interface IPlat extends Omit<IIPlat, "_id">, Document {}

export interface IPlatMenu extends Omit<IIPlatMenu, "_id">, Document {}

export interface IPlatCommande extends Omit<IIPlatCommande, "_id">, Document {}

export interface IPlatEnPreparation extends Omit<IIPlatEnPreparation, "_id">, Document {}

export const Plat = model<IPlat, Model<IPlat>>("Plat", PlatSchema, "plats");

export const PlatMenu = model<IPlatMenu, Model<IPlatMenu>>("PlatMenu", PlatMenuSchema, "platsmenu");

export const PlatCommande = model<IPlatCommande, Model<IPlatCommande>>("PlatCommande", PlatCommandeSchema, "platscommandes");

export const PlatEnPreparation = model<IPlatEnPreparation, Model<IPlatEnPreparation>>("PlatEnPreparation", PlatEnPreparationSchema, "PlatEnPreparation");