import * as AlimentService from '../services/aliment.service.js';

export const getAlimentPlat = async (req: any, res: any) => {
    const { id } = req.params;
    const personnel = await AlimentService.getAlimentPlat(id);
    return res.status(200).json(personnel);
}