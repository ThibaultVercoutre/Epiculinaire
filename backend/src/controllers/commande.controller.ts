import * as CommandeService from '../services/commande.service.js';

export const getCommandeById = async (req: any, res: any) => {
    const { id } = req.params;
    const personnel = await CommandeService.getCommandeById(id);
    return res.status(200).json(personnel);
}