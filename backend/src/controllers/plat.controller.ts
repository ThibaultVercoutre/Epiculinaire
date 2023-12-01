import * as PlatsService from '../services/plat.service.js';

export const getPlats = async (req: any, res: any) => {
    const plats = await PlatsService.getPlats();
    return res.status(200).json(plats);
}

export const getPlatsCommandes = async (req: any, res: any) => {
    const plats = await PlatsService.getPlatsCommandes();
    return res.status(200).json(plats);
}