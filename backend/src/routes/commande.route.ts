import express from 'express';
import * as CommandeController from '../controllers/commande.controller.js';

export const commandeRouter = express.Router();

commandeRouter.get('/commandes/:id', CommandeController.getCommandeById);

commandeRouter.get('/commandes/:heure', CommandeController.getCommande);

commandeRouter.post('/commandeadd/:id_plat/:id_reservation/:heure', CommandeController.setCommande);

commandeRouter.post('/commandepreparationadd/:id_plat/:id_ingredient/:id_serveur/:id_reservation', CommandeController.setCommandePreparation);