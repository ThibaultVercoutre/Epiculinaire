import { connexion } from "../../bdd/connect.js";
import { ServeurAffectation, IServeurAffectation } from "../models/serveur.model.js";
import { TableEtat } from "../models/table.model.js";

export async function getServeurAffectation() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT p.name as serveur_name
                         FROM personnel p
                         LEFT JOIN user u ON p.type = u.id_user
                         WHERE u.name = "serveur"`;
            db.all(sql, [], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    //const sotck = rows.map(row => new ServeurAffectation(row));
                    const serveursAffectation: IServeurAffectation[] = [];
                    rows.forEach((row: any) => {
                        const serveurAffectation = new ServeurAffectation({
                            serveur_name: row.serveur_name,
                            table: []
                        });
                        serveursAffectation.push(serveurAffectation);
                    });
                    const sql2 = `SELECT at.id_table, m.name as mission, p.name as serveur_name
                                  FROM affectation_table at
                                  LEFT JOIN personnel p ON at.id_serveur = p.id_personnel
                                  LEFT JOIN mission m ON at.mission = m.id;`;
                    db.all(sql2, [], (err, rows) => {
                        if (err) {
                            db.close();
                            reject(err);
                        } else {
                            rows.forEach((row: any) => {
                                const commande = new TableEtat({
                                    id: row.id_table as number,
                                    heure: row.mission as string,
                                });
                                serveursAffectation.forEach((serveurAffectation: IServeurAffectation) => {
                                    if (serveurAffectation.serveur_name == row.serveur_name) { // Fixed the property name here
                                        serveurAffectation.tables.push(commande);
                                    }
                                    for(var i = 0; i < serveursAffectation.length; i++) {
                                        if(serveursAffectation[i].serveur_name == serveurAffectation.serveur_name){
                                            serveursAffectation[i] = serveurAffectation;
                                        }
                                    }
                                });
                            });
                            db.close();
                            resolve(serveursAffectation);
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