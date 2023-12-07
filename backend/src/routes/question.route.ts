import express from 'express';
import * as QuestionController from '../controllers/question.controller.js';

export const questionRouter = express.Router();

questionRouter.get('/questions/:id', QuestionController.getQuestionsAliment);