import { connexion } from "../../bdd/connect.js";
import { Plat, PlatCommande, PlatEnPreparation, PlatMenu, IPlat, IPlatCommande, IPlatEnPreparation, IPlatMenu } from "../models/plat.model.js";

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

export async function getPlatID(id: number) {
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            const sql = `SELECT plat.name AS platname, type.name AS typename 
                        FROM plat 
                        INNER JOIN type ON plat.id_type = type.id 
                        WHERE NOT EXISTS ( SELECT * FROM composition LEFT JOIN stock ON composition.id_ingredient = stock.id WHERE composition.id_plat = plat.id AND (stock.quantity IS NULL OR stock.quantity < composition.quantite))
                        AND plat.id = ?`;
            db.all(sql, [id], (err: Error, rows: IPlat[]) => {
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
            const sql = `SELECT p.name as name, r.id_table as id_table, ec.Etat as etat
                        FROM commande c
                        INNER JOIN reservation r ON r.id = c.id_reservation
                        INNER JOIN plat p ON p.id = c.id_plat
                        INNER JOIN Etat_commande ec ON ec.id_etat = c.etat`;
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

export async function getPlatsByType(id: number){
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            const sql = `SELECT plat.id as id, plat.name as platname
                        FROM plat
                        WHERE id_type = ?`;
            db.all(sql, [id], (err: Error, rows: IPlatMenu[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const plats = rows.map(row => new PlatMenu(row));
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