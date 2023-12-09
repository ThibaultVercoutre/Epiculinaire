import { connexion } from "../../bdd/connect.js";
import { Plat, PlatCommande, PlatEnPreparation, IPlat, IPlatCommande, IPlatEnPreparation } from "../models/plat.model.js";

export async function getPlats() {
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            const sql = "SELECT plat.name AS platname, type.name AS typename FROM plat INNER JOIN type ON plat.id_type = type.id WHERE NOT EXISTS ( SELECT * FROM composition LEFT JOIN stock ON composition.id_ingredient = stock.id WHERE composition.id_plat = plat.id AND (stock.quantity IS NULL OR stock.quantity < composition.quantite))";
            db.all(sql, [], (err: Error, rows: IPlat[]) => {
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
            const sql = "SELECT plat.name AS platname, plat.price, type.name AS typename, reservation.date FROM plat INNER JOIN type ON plat.id_type = type.id INNER JOIN commande ON plat.id = commande.id_plat INNER JOIN reservation ON commande.id_reservation = reservation.id";
            db.all(sql, [], (err: Error, rows: IPlatCommande[]) => {
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

export async function getPlatsPreparation() {
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            const sql = "SELECT DISTINCT p.name as name, r.id_table as id_table, ec.Etat as etat FROM plat_en_preparation pp INNER JOIN Etat_commande ec ON pp.etat = ec.id_etat INNER JOIN plat p ON pp.id_plat = p.id INNER JOIN reservation r ON pp.id_reservation = r.id ORDER BY r.id_table ASC";
            db.all(sql, [], (err: Error, rows: IPlatEnPreparation[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const plats = rows.map(row => new PlatEnPreparation(row));
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