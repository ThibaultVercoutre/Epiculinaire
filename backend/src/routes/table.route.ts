import express from 'express';
import * as TableController from '../controllers/table.controller.js';

export const tableRouter = express.Router();

tableRouter.get('/tables', TableController.getTables);

tableRouter.get('/tablesdetails', TableController.getTablesDetails);

tableRouter.get('/tablesdetails/:id', TableController.getTablesDetailsIdT);

tableRouter.get('/tablesdetailsR/:id', TableController.getTablesDetailsIdR);

tableRouter.get('/tablesavancement', TableController.getTablesAvancement);

tableRouter.post('/tableupdate/:id/:x/:y/:rotation', TableController.updateTable);