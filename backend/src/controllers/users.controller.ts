import * as UsersService from '../services/users.service.js';

export const getUsers = async (req: any, res: any) => {
    const users = await UsersService.getUsers();
    return res.status(200).json(users);
}

export const getCuisiniers = async (req: any, res: any) => {
    const cuisiniers = await UsersService.getCuisiniers();
    return res.status(200).json(cuisiniers);
}

export const getUser = async (req: any, res: any) => {
    const { name, password } = req.params;
    const users = await UsersService.getUser(name, password);
    return res.status(200).json(users);
}

export const setUser = async (req: any, res: any) => {
    const { id, password } = req.params;
    const users = await UsersService.setUser(id, password);
    return res.status(200).json(users);
}