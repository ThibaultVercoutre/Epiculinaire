import * as PlatsService from '../services/plat.service.js';

export const getPlats = async (req: any, res: any) => {
    const plats = await PlatsService.getPlats();
    return res.status(200).json(plats);
}

export const getPlatID = async (req: any, res: any) => {
    const id = req.params.id;
    const plats = await PlatsService.getPlatID(id);
    return res.status(200).json(plats);
}

export const getPlatsCommandes = async (req: any, res: any) => {
    const plats = await PlatsService.getPlatsCommandes();
    return res.status(200).json(plats);
}

export const getPlatsPreparation = async (req: any, res: any) => {
    const plats = await PlatsService.getPlatsPreparation();
    return res.status(200).json(plats);
}