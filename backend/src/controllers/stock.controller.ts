import * as StockService from '../services/stock.service.js';

export const getStock = async (req: any, res: any) => {
    const stock = await StockService.getStock();
    return res.status(200).json(stock);
}