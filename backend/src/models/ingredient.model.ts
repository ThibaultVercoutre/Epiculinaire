import { model, Schema, Model, Types } from "mongoose";

const IngredientSchema: Schema = new Schema(
  {
    id_ingredient: {
        type: Number,
        required: true,
    },
  }
);

export interface IIIngredient {
    _id: Types.ObjectId;
    id: number;
}

export interface IIngredient extends Omit<IIIngredient, "_id">, Document {}

export const Ingredient = model<IIngredient, Model<IIngredient>>("Ingredient", IngredientSchema, "Ingredient");