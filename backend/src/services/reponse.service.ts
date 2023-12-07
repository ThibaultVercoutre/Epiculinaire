import { connexion } from "../../bdd/connect.js";
import { Reponse } from "../models/reponse.model.js";

export async function getReponsesQuestion(id: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT r.id, question as name_reponse
                         FROM reponse r
                         LEFT JOIN question q ON r.id_question = q.id
                         WHERE q.id = ?`
            db.all(sql, [id], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const reponses = rows.map(row => new Reponse(row));
                    db.close();
                    resolve(reponses);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}