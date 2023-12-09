import express from 'express';
import * as ServeurAffectationController from '../controllers/serveur.controller.js';

export const serveurRouter = express.Router();

serveurRouter.get('/serveursaffectations', ServeurAffectationController.getServeurAffectation);