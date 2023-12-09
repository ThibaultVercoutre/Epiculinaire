import { connexion } from "../../bdd/connect.js";
import { User, IUser } from "../models/users.model.js";
import bcrypt from 'bcrypt';

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

export async function getUsers() {
    try{
        const db = await connexion();

        return new Promise((resolve, reject) => {
            db.all("SELECT * from user", [], (err: Error, rows: IUser[]) => {
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

export async function getUser(name: string, password: string) {
    try{
        const db = await connexion();


        return new Promise((resolve, reject) => {
            db.all("SELECT * from user WHERE name = ?", [name], (err: Error, rows: IUser[]) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const users = rows.map(row => new User(row));
                    if(users.length > 0){
                        bcrypt.compare(password, users[0].password, (err, res) => {
                            if(res){
                                db.close();
                                resolve(users);
                            }else{
                                db.close();
                                resolve([]);
                            }
                        });
                    }
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function setUser(id: number, password: string) {
    try{
        const db = await connexion();

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return new Promise((resolve, reject) => {
            const sql = "UPDATE user SET password = ? WHERE id_user = ?";
            db.all(sql, [hashedPassword, id], (err: Error, rows: any) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    // const users = rows.map(row => new User(row));
                    db.close();
                    // resolve(users);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}