import express from 'express';
import * as TableController from '../controllers/table.controller.js';

export const tableRouter = express.Router();

tableRouter.get('/tables', TableController.getTables);

tableRouter.get('/tablesdetails', TableController.getTablesDetails);

tableRouter.get('/tablesdetails/:id', TableController.getTablesDetailsId);

tableRouter.get('/tablesavancement', TableController.getTablesAvancement);