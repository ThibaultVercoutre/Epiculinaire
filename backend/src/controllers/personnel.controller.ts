import * as PersonnelService from '../services/personnel.service.js';

export const getUsers = async (req: any, res: any) => {
    const personnel = await PersonnelService.getUsers();
    return res.status(200).json(personnel);
}