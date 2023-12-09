import * as PersonnelService from '../services/personnel.service.js';

export const getPersonnels = async (req: any, res: any) => {
    const personnel = await PersonnelService.getPersonnels();
    return res.status(200).json(personnel);
}