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

export async function setCommandePreparation(id_plat: number, id_ingredient: number, id_serveur: number, id_reservation: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO plat_en_preparation (id_commande, id_ingredient, id_serveur, id_reservation, etat) VALUES (?, ?, ?, ?, 1)`;
            db.all(sql, [id_plat, id_ingredient, id_serveur, id_reservation], (err: Error, rows: IPlatCommande[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    
                    db.close();
                    resolve(["Success"]);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function setCommande(id_plat: number, id_reservation: number, heure: string) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO commande (id_plat, id_reservation, heure, etat) VALUES (?, ?, ?, 1)`;
            db.all(sql, [id_plat, id_reservation, heure], (err: Error, rows: IPlatCommande[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    db.get("SELECT last_insert_rowid() as id", (err: Error, row: { id: number }) => {
                        if (err) {
                            db.close();
                            reject(err);
                        } else {
                            db.close();
                            resolve(row.id);
                        }
                    });
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getCommande(heure: string) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT id 
                        FROM commande 
                        WHERE heure = ?`;
            db.all(sql, [heure], (err: Error, rows: IPlatCommande[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const commande = rows.map(row => new PlatCommande(row));
                    db.close();
                    resolve(commande);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}