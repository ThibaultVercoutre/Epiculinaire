import { connexion } from "../../bdd/connect.js";
import { Finance, IFinance } from "../models/finance.model.js";

export async function getFinances() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT *
                         FROM caisse`;
            db.all(sql, [], (err: Error, rows: IFinance[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const finance = rows.map(row => new Finance(row));
                    db.close();
                    resolve(finance);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}