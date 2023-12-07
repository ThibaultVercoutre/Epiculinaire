import { model, Schema, Model, Types } from "mongoose";

const CommandeSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    heure: {
      type: String,
      required: true,
    },
    etat: {
        type: Number,
        required: true,
    },
  }
);

export interface IICommande {
    _id: Types.ObjectId;
    id: number;
    heure: number;
    etat: number;
}

export interface ICommande extends Omit<IICommande, "_id">, Document {}

export const Commande = model<ICommande, Model<ICommande>>("Commande", CommandeSchema, "Commande");