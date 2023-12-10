import * as TableService from '../services/table.service.js';

export const getTables = async (req: any, res: any) => {
    const personnel = await TableService.getTables();
    return res.status(200).json(personnel);
}

export const getTablesDetails = async (req: any, res: any) => {
    const personnel = await TableService.getTablesDetails();
    return res.status(200).json(personnel);
}

export const getTablesDetailsIdT = async (req: any, res: any) => {
    const { id } = req.params;
    const personnel = await TableService.getTablesDetailsIdT(id);
    return res.status(200).json(personnel);
}

export const getTablesDetailsIdR = async (req: any, res: any) => {
    const { id } = req.params;
    const personnel = await TableService.getTablesDetailsIdR(id);
    return res.status(200).json(personnel);
}

export const getTablesAvancement = async (req: any, res: any) => {
    const personnel = await TableService.getTablesAvancement();
    return res.status(200).json(personnel);
}

export const updateTable = async (req: any, res: any) => {
    const { id, x, y, rotation } = req.params;
    const users = await TableService.updateTable(id, x, y, rotation);
    return res.status(200).json(users);
}