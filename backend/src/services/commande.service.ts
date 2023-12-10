import { connexion } from "../../bdd/connect.js";
import { PlatCommande, IPlatCommande } from "../models/plat.model.js";

export async function getCommandeById(id: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT p.name as platname, t.name as typename, p.price as price, r.date as date FROM reservation r 
                        INNER JOIN commande c ON r.id  = c.id_reservation
                        INNER JOIN plat p ON p.id = c.id_plat
                        INNER JOIN type t ON t.id = p.id_type
                        WHERE r.id = ?
                        ORDER BY t.id`;
            db.all(sql, [id], (err: Error, rows: IPlatCommande[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new PlatCommande(row));
                    db.close();
                    resolve(users);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}