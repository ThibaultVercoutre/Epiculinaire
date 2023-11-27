import * as TableService from '../services/table.service.js';

export const getTables = async (req: any, res: any) => {
    const personnel = await TableService.getTables();
    return res.status(200).json(personnel);
}