import express from 'express';
import * as UsersController from '../controllers/users.controller.js';

export const usersRouter = express.Router();

usersRouter.get('/users', UsersController.getUsers);

usersRouter.get('/cuisiniers', UsersController.getCuisiniers);

usersRouter.get('/user/:name/:password', UsersController.getUser);

// usersRouter.post('/users/:id/:password', UsersController.setUser);