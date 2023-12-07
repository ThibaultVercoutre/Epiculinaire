import * as ResponseService from '../services/reponse.service.js';

export const getReponsesQuestion = async (req: any, res: any) => {
    const { id } = req.params;
    const reponses = await ResponseService.getReponsesQuestion(id);
    return res.status(200).json(reponses);
}