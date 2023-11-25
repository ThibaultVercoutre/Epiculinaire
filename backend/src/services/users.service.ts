import { connexion } from "../../bdd/connect.js";
import { User } from "../models/users.model.js";
import sqlite3 from 'sqlite3';

async function connect(db: sqlite3.Database) {
    await new Promise<void>((resolve, reject) => {
        // db.run("CREATE TABLE IF NOT EXISTS user (id_user INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, password TEXT NOT NULL)", (err: Error) => {
        //     if (err) {
        //         console.error(err.message);
        //         reject(err);
        //     }
        //     resolve();
        // });
    });
}

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