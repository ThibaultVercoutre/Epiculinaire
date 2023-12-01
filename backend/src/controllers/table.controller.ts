import * as TableService from '../services/table.service.js';

export const getTables = async (req: any, res: any) => {
    const personnel = await TableService.getTables();
    return res.status(200).json(personnel);
}

export const getTablesDetails = async (req: any, res: any) => {
    const personnel = await TableService.getTablesDetails();
    return res.status(200).json(personnel);
}

export const getTablesDetailsId = async (req: any, res: any) => {
    const { id } = req.params;
    const personnel = await TableService.getTablesDetailsId(id);
    return res.status(200).json(personnel);
}

export const getTablesAvancement = async (req: any, res: any) => {
    const personnel = await TableService.getTablesAvancement();
    return res.status(200).json(personnel);
}