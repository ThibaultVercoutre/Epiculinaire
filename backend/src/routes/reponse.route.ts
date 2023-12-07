import express from 'express';
import * as ReponseController from '../controllers/reponse.controller.js';

export const reponseRouter = express.Router();

reponseRouter.get('/reponses/:id', ReponseController.getReponsesQuestion);