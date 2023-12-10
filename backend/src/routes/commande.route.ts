import express from 'express';
import * as CommandeController from '../controllers/commande.controller.js';

export const commandeRouter = express.Router();

commandeRouter.get('/commandes/:id', CommandeController.getCommandeById);