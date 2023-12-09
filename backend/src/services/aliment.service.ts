import { connexion } from "../../bdd/connect.js";
import { Aliment, IAliment } from "../models/aliment.model.js";

export async function getAlimentPlat(id: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT s.id as id, s.name as name_aliment, p.name as name_plat
                        FROM stock s 
                        LEFT JOIN composition c ON s.id = c.id_ingredient
                        LEFT JOIN plat p ON c.id_plat = p.id
                        WHERE p.id = ?`
            db.all(sql, [id], (err: Error, rows: IAliment[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const reservations = rows.map(row => new Aliment(row));
                    db.close();
                    resolve(reservations);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}