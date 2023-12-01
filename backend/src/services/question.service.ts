import { connexion } from "../../bdd/connect.js";
import { Question } from "../models/question.model.js";

export async function getQuestionsAliment(id: number) {
    try{
        const db = await connexion();
        console.log("db", db);

        return new Promise((resolve, reject) => {
            const sql = `SELECT q.id, question as name_question
                         FROM question q
                         LEFT JOIN questions_aliment qa ON q.id = qa.id_question
                         WHERE qa.id_aliment = ?`
            db.all(sql, [id], (err, rows) => {
                if (err) {
                    db.close();
                    reject(err);
                } else {
                    const questions = rows.map(row => new Question(row));
                    db.close();
                    resolve(questions);
                }
            });
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}