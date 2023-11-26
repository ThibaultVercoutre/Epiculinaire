import { connexion } from "../../bdd/connect.js";
import { Personnel } from "../models/personnel.model.js";

export async function getUsers() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = "SELECT id_personnel, user.name as type, personnel.name as name FROM personnel INNER JOIN user ON personnel.type = user.id_user"
            db.all(sql, [], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new Personnel(row));
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