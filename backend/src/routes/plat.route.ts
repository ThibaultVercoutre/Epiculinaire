import express from 'express';
import * as PlatsController from '../controllers/plat.controller.js';

export const platRouter = express.Router();

platRouter.get('/plats', PlatsController.getPlats);

platRouter.get('/plat/:id', PlatsController.getPlatID);

platRouter.get('/plattype/:id', PlatsController.getPlatsByType);

platRouter.get('/platscommandes', PlatsController.getPlatsCommandes);

platRouter.get('/platspreparation', PlatsController.getPlatsPreparation);