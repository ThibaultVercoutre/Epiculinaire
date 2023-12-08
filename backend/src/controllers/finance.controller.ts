import * as FinanceService from '../services/finance.servcice.js';

export const getFinances = async (req: any, res: any) => {
    const finance = await FinanceService.getFinances();
    return res.status(200).json(finance);
}