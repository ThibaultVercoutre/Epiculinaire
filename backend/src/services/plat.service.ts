import { connexion } from "../../bdd/connect.js";
import { Plat } from "../models/plat.model.js";
import { PlatCommande } from "../models/plat.model.js";

export async function getPlats() {
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            db.all("SELECT plat.name AS platname, type.name AS typename FROM plat INNER JOIN type ON plat.id_type = type.id WHERE NOT EXISTS ( SELECT * FROM composition LEFT JOIN stock ON composition.id_ingredient = stock.id WHERE composition.id_plat = plat.id AND (stock.quantity IS NULL OR stock.quantity < composition.quantite))", [], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const plats = rows.map(row => new Plat(row));
                    db.close();
                    resolve(plats);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getPlatsCommandes() {
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            db.all("SELECT plat.name AS platname, plat.price, type.name AS typename, reservation.date FROM plat INNER JOIN type ON plat.id_type = type.id INNER JOIN commande ON plat.id = commande.id_plat INNER JOIN reservation ON commande.id_reservation = reservation.id", [], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const plats = rows.map(row => new PlatCommande(row));
                    db.close();
                    resolve(plats);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}