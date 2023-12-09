import { model, Schema, Model, Types } from "mongoose";

const QuestionSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    name_question: {
      type: String,
      required: true,
    }
  }
);

export interface IIQuestion {
    _id: Types.ObjectId;
    id: number;
    name_Question: string;
    serveur_name: string;
}

export interface IQuestion extends Omit<IIQuestion, "_id">, Document {}

export const Question = model<IQuestion, Model<IQuestion>>("Question", QuestionSchema, "Question");