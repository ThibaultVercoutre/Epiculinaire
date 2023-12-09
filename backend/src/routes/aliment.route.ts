import express from 'express';
import * as AlimentController from '../controllers/aliment.controller.js';

export const alimentRouter = express.Router();

alimentRouter.get('/aliments/:id', AlimentController.getAlimentPlat);