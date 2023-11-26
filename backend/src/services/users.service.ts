import { connexion } from "../../bdd/connect.js";
import { User } from "../models/users.model.js";

export async function getUsers() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            db.all("SELECT * from user", [], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new User(row));
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