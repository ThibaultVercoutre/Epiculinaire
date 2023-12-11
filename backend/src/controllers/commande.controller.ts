import * as CommandeService from '../services/commande.service.js';

export const getCommandeById = async (req: any, res: any) => {
    const { id } = req.params;
    const personnel = await CommandeService.getCommandeById(id);
    return res.status(200).json(personnel);
}

export const setCommandePreparation = async (req: any, res: any) => {
    const { id_plat, id_ingredient, id_serveur, id_reservation } = req.params;    
    const personnel = await CommandeService.setCommandePreparation(id_plat, id_ingredient, id_serveur, id_reservation);
    return res.status(200).json(personnel);
}

export const setCommande = async (req: any, res: any) => {
    const { id_plat, id_reservation, heure } = req.params;    
    const personnel = await CommandeService.setCommande(id_plat, id_reservation, heure);
    return res.status(200).json(personnel);
}

export const getCommande = async (req: any, res: any) => {
    const { heure } = req.params;    
    const personnel = await CommandeService.getCommande(heure);
    return res.status(200).json(personnel);
}