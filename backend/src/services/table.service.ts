import { connexion } from "../../bdd/connect.js";
import { Table } from "../models/table.model.js";

export async function getTables() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM table_resto"
            db.all(sql, [], (err, rows) => {
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
            const sql = "SELECT * FROM table_resto"
            db.all(sql, [], (err, rows) => {
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