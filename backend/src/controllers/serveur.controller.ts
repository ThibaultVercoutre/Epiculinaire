import * as ServeurService from '../services/serveur.service.js';

export const getServeurAffectation = async (req: any, res: any) => {
    const serveursAffectations = await ServeurService.getServeurAffectation();
    return res.status(200).json(serveursAffectations);
}