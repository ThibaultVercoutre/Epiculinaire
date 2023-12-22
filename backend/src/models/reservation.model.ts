import { model, Schema, Model, Types } from "mongoose";
import { Commande, ICommande } from "../models/commande.model.js";

const ReservationSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    nb_personnes: {
      type: Number,
      required: true,
    },
    id_Reservation: {
        type: Number,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
    mail: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
  }
);

export interface IIReservation {
    _id: Types.ObjectId;
    id: number;
    nb_personnes: number;
    id_Reservation: number;
    nom: string;
    mail: string;
    date: String;
}

export interface IReservation extends Omit<IIReservation, "_id">, Document {}

export const Reservation = model<IReservation, Model<IReservation>>("Reservation", ReservationSchema, "Reservation");