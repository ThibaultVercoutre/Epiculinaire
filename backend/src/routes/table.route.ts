import express from 'express';
import * as TableController from '../controllers/table.controller.js';

export const tableRouter = express.Router();

tableRouter.get('/tables', TableController.getTables);