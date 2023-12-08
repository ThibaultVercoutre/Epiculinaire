import express from 'express';
import * as FinanceController from '../controllers/finance.controller.js';

export const financeRouter = express.Router();

financeRouter.get('/finances', FinanceController.getFinances);