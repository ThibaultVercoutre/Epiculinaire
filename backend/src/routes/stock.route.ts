import express from 'express';
import * as StockController from '../controllers/stock.controller.js';

export const stockRouter = express.Router();

stockRouter.get('/stock', StockController.getStock);