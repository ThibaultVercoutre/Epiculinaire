import * as IngredientService from '../services/ingredient.service.js';

export const getIngredientPlat = async (req: any, res: any) => {
    const id = req.params.id;
    const personnel = await IngredientService.getIngredientPlat(id);
    return res.status(200).json(personnel);
}