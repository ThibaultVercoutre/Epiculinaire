import express from 'express';
import * as UsersController from '../controllers/users.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/users', UsersController.getUsers);