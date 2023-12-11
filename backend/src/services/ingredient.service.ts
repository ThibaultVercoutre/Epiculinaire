import { connexion } from "../../bdd/connect.js";
import { Ingredient, IIngredient } from "../models/ingredient.model.js";

export async function getIngredientPlat(id: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT id_ingredient
                        FROM composition
                        WHERE id_plat = ?`
            db.all(sql, [id], (err: Error, rows: IIngredient[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const reservations = rows.map(row => new Ingredient(row));
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