import express from 'express';
import * as IngredientController from '../controllers/ingredient.controller.js';

export const ingredientRouter = express.Router();

ingredientRouter.get('/ingredients/:id', IngredientController.getIngredientPlat);