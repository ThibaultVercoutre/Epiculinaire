import { model, Schema, Model, Types } from "mongoose";

const ReponseSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    name_reponse: {
      type: String,
      required: true,
    }
  }
);

export interface IIReponse {
    _id: Types.ObjectId;
    id: number;
    name_Reponse: string;
    serveur_name: string;
}

export interface IReponse extends Omit<IIReponse, "_id">, Document {}

export const Reponse = model<IReponse, Model<IReponse>>("Reponse", ReponseSchema, "Reponse");