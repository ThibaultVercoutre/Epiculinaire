import express from 'express';
import * as PlatsController from '../controllers/plat.controller.js';

export const platRouter = express.Router();

platRouter.get('/plats', PlatsController.getPlats);
platRouter.get('/platscommandes', PlatsController.getPlatsCommandes);
platRouter.get('/platspreparation', PlatsController.getPlatsPreparation);