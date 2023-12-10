import { connexion } from "../../bdd/connect.js";
import { Table, TableCommande, TableAvancement, ITableCommande, ITable, ITableAvancement } from "../models/table.model.js";
import { Commande , ICommande} from "../models/commande.model.js";

export async function getTables() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM table_resto"
            db.all(sql, [], (err: Error, rows: ITable[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new Table(row));
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

export async function getTablesDetails() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM table_resto";
            db.all(sql, [], (err: Error, rows: any[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    // Créer un tableau de TableCommande
                    const tables: ITableCommande[] = [];
                    rows.forEach((row: any) => {
                        const table = new TableCommande({
                            id: row.id as number,
                            taille: row.taille as number,
                            x: row.x as number,
                            y: row.y as number,
                            rotation: row.rotation as number,
                            _id: row._id as number,
                            commandes: []
                        });
                        tables.push(table);
                    });
                    const sql2 = `
                        SELECT r.id_table as id_table, c.id as id_commande, c.heure, c.etat
                        FROM table_resto t
                        LEFT JOIN reservation r ON t.id = r.id_table
                        LEFT JOIN commande c ON r.id = c.id_reservation
                    `;
                    db.all(sql2, [], (err: Error, rows: any) => {
                        if (err) {
                            db.close();
                            reject(err);
                        } else {
                            rows.forEach((row: any) => {
                                const commande = new Commande({
                                    id: row.id_commande as number,
                                    heure: row.heure as number,
                                    etat: row.etat as number,
                                });
                                tables.forEach((table: ITableCommande) => {
                                    if (table.id == row.id_table) {
                                        table.commandes.push(commande);
                                    }
                                    for(var i = 0; i < tables.length; i++) {
                                        if(tables[i].id == table.id){
                                            tables[i] = table;
                                        }
                                    }
                                });
                            });
                            db.close();
                            resolve(tables);
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

export async function getTablesDetailsIdT(id: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM table_resto WHERE id = ?";
            db.all(sql, [id], (err: Error, rows: any[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    // Créer un tableau de TableCommande
                    const tables: ITableCommande[] = [];
                    rows.forEach((row: any) => {
                        const table = new TableCommande({
                            id: row.id as number,
                            taille: row.taille as number,
                            x: row.x as number,
                            y: row.y as number,
                            rotation: row.rotation as number,
                            _id: row._id as number,
                            commandes: []
                        });
                        tables.push(table);
                    });
                    const sql2 = `
                        SELECT r.id_table as id_table, c.id as id_commande, c.heure, c.etat
                        FROM table_resto t
                        LEFT JOIN reservation r ON t.id = r.id_table
                        LEFT JOIN commande c ON t.id = c.id_reservation
                        WHERE t.id = ?
                    `;
                    db.all(sql2, [id], (err: Error, rows: any[]) => {
                        if (err) {
                            db.close();
                            reject(err);
                        } else {
                            rows.forEach((row: any) => {
                                const commande = new Commande({
                                    id: row.id_commande as number,
                                    heure: row.heure as number,
                                    etat: row.etat as number,
                                });
                                tables.forEach((table: ITableCommande) => {
                                    if (table.id == row.id_table) { // Fixed the property name here
                                        table.commandes.push(commande);
                                    }
                                    for(var i = 0; i < tables.length; i++) {
                                        if(tables[i].id == table.id){
                                            tables[i] = table;
                                        }
                                    }
                                });
                            });
                            db.close();
                            resolve(tables);
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

export async function getTablesDetailsIdR(id: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql =  `SELECT tr.id, taille, x, y, rotation, t.name as avancement, r.nom as name FROM table_resto tr
                        INNER JOIN reservation r ON tr.id = r.id_table
                        INNER JOIN type t ON r.avancement = t.id
                        WHERE tr.id = ?`;
            db.all(sql, [id], (err: Error, rows: any[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    // Créer un tableau de TableCommande
                    const tables: ITableCommande[] = [];
                    rows.forEach((row: any) => {
                        const table = new TableCommande({
                            id: row.id as number,
                            taille: row.taille as number,
                            x: row.x as number,
                            y: row.y as number,
                            rotation: row.rotation as number,
                            avancement: row.avancement as string,
                            name: row.name as string,
                            _id: row._id as number,
                            commandes: []
                        });
                        tables.push(table);
                    });
                    const sql2 = `
                        SELECT r.id_table as id_table, c.id as id_commande, c.heure, ec.Etat as etatString, p.name as name
                        FROM table_resto tr
                        LEFT JOIN reservation r ON tr.id = r.id_table
                        LEFT JOIN commande c ON r.id = c.id_reservation
                        LEFT JOIN plat p ON c.id_plat = p.id
                        LEFT JOIN Etat_commande ec ON c.etat = ec.id_etat
                        WHERE tr.id = ?
                    `;
                    db.all(sql2, [id], (err: Error, rows: any[]) => {
                        if (err) {
                            db.close();
                            reject(err);
                        } else {
                            rows.forEach((row: any) => {
                                const commande = new Commande({
                                    id: row.id_commande as number,
                                    heure: row.heure as number,
                                    etatString: row.etatString as number,
                                    name: row.name as string,
                                });
                                tables.forEach((table: ITableCommande) => {
                                    if (table.id == row.id_table) { // Fixed the property name here
                                        table.commandes.push(commande);
                                    }
                                    for(var i = 0; i < tables.length; i++) {
                                        if(tables[i].id == table.id){
                                            tables[i] = table;
                                        }
                                    }
                                });
                            });
                            db.close();
                            resolve(tables);
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

export async function getTablesAvancement() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT id_table as id, name as avancement FROM reservation
                         INNER JOIN type ON reservation.avancement = type.id`
            db.all(sql, [], (err: Error, rows: ITableAvancement[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new TableAvancement(row));
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


// à faire, mais chaud à faire
export async function getTablesCommande() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM table_resto WHERE id = ?"
            db.all(sql, [], (err: Error, rows: ITable[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new Table(row));
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

export async function updateTable(id: number, x: number, y: number, rotation: number) {
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            const sql = "UPDATE table_resto SET x = ?, y = ?, rotation = ? WHERE id = ?";
            db.all(sql, [x, y, rotation, id], (err: Error, rows: ITable[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new Table(row));
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