import * as QuestionService from '../services/question.service.js';

export const getQuestionsAliment = async (req: any, res: any) => {
    const { id } = req.params;
    const questions = await QuestionService.getQuestionsAliment(id);
    return res.status(200).json(questions);
}