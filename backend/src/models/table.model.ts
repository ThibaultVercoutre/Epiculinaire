import { model, Schema, Model, Types } from "mongoose";
import { Commande, ICommande } from "../models/commande.model.js";

const TableSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    taille: {
      type: Number,
      required: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    rotation: {
        type: Number,
        required: true,
    },
  }
);

export interface IITable {
    _id: Types.ObjectId;
    id: number;
    taille: number;
    x: number;
    y: number;
    rotation: number;
}

export interface ITable extends Omit<IITable, "_id">, Document {}

export const Table = model<ITable, Model<ITable>>("Table", TableSchema, "Table");

const TableCommandeSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    taille: {
      type: Number,
      required: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    rotation: {
        type: Number,
        required: true,
    },
    commandes: [ Commande.schema ],
  }
);

export interface IITableCommande {
    _id: Types.ObjectId;
    id: number;
    taille: number;
    x: number;
    y: number;
    rotation: number;
    commandes: [ ICommande ];
}

export interface ITableCommande extends Omit<IITableCommande, "_id">, Document {}

export const TableCommande = model<ITableCommande, Model<ITableCommande>>("TableCommande", TableCommandeSchema, "TableCommande");


const TableAvancementSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    avancement: {
      type: String,
      required: true,
    },
  }
);

export interface IITableAvancement {
    _id: Types.ObjectId;
    id: number;
    avancement: String;
}

export interface ITableAvancement extends Omit<IITableAvancement, "_id">, Document {}

export const TableAvancement = model<ITableAvancement, Model<ITableAvancement>>("TableAvancement", TableAvancementSchema, "TableAvancement");


const TableEtatSchema: Schema = new Schema(
  {
    id: {
        type: Number,
        required: true,
    },
    mission: {
      type: String,
      required: true,
    },
  }
);

export interface IITableEtat {
    _id: Types.ObjectId;
    id: number;
    avancement: String;
}

export interface ITableEtat extends Omit<IITableEtat, "_id">, Document {}

export const TableEtat = model<ITableEtat, Model<ITableEtat>>("TableAvancement", TableAvancementSchema, "TableAvancement");