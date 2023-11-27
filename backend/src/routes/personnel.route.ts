import express from 'express';
import * as PersonnelController from '../controllers/personnel.controller.js';

export const personnelRouter = express.Router();

personnelRouter.get('/personnels', PersonnelController.getPersonnels);