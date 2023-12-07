import { connexion } from "../../bdd/connect.js";
import { Stock } from "../models/stock.model.js";

export async function getStock() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT stock.id as id, stock.name as name, type_ingredient.type as type, stock.quantity as quantity
                         FROM stock
                         INNER JOIN type_ingredient ON stock.type = type_ingredient.id`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const sotck = rows.map(row => new Stock(row));
                    db.close();
                    resolve(sotck);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// faire la commande post