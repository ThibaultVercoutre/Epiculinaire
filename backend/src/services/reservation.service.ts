import { connexion } from "../../bdd/connect.js";
import { Reservation, IReservation } from "../models/reservation.model.js";

export async function getReservations() {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM reservation"
            db.all(sql, [], (err: Error, rows: IReservation[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const reservations = rows.map(row => new Reservation(row));
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

export async function getReservation(date: string) {
    try{
        const db = await connexion();
        console.log("db", db);
        
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM reservation WHERE date LIKE ?"
            db.all(sql, [date + "%"], (err: Error, rows: IReservation[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const reservations = rows.map(row => new Reservation(row));
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

export async function setReservation(nb_personnes: number, name: string, mail: string, date: string) {
    try{
        const db = await connexion();
        
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO reservation (nb_personnes, id_table, nom, mail, date, avancement) VALUES (?, 0, ?, ?, ?, 0)"
            db.all(sql, [nb_personnes, name, mail, date], (err: Error, rows: IReservation[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const reservations = rows.map(row => new Reservation(row));
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