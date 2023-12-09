import sqlite3 from 'sqlite3';
const dbname = 'epiculinaire_bdd.db';

export const connexion = async () => {
    return new Promise<sqlite3.Database>((resolve, reject) => {
        let db = new sqlite3.Database('./bdd/' + dbname, sqlite3.OPEN_READWRITE, (err: Error | null) => {
            if (err) {
                console.error("Erreur lors de la connexion à la base de données SQLite", err);
                reject(err);
            } else {
                console.log('Connecté à la base de données SQLite.');
                resolve(db);
            }
        });
    });
};