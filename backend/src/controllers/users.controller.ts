import * as UsersService from '../services/users.service.js';

export const getUsers = async (req: any, res: any) => {
    const users = await UsersService.getUsers();
    return res.status(200).json(users);
}