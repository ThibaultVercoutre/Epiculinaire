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
    name: {
        type: String,
        required: true,
    },
    etat: {
        type: Number,
        required: true,
    },
    etatString: {
      type: String,
      required: true,
  },
  }
);

export interface IICommande {
    _id: Types.ObjectId;
    id: number;
    heure: number;
    etat: number;
    name: string;
}

export interface ICommande extends Omit<IICommande, "_id">, Document {}

export const Commande = model<ICommande, Model<ICommande>>("Commande", CommandeSchema, "Commande");