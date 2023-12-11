// import * as http from "http";
import express from "express";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { usersRouter } from "./routes/users.route.js";
import { personnelRouter } from "./routes/personnel.route.js";
import { tableRouter} from "./routes/table.route.js";
import { stockRouter} from "./routes/stock.route.js";
import { serveurRouter } from "./routes/serveur.route.js";
import { platRouter } from "./routes/plat.route.js";
import { reservationRouter } from "./routes/reservation.route.js";
import { alimentRouter } from "./routes/aliment.route.js";
import { questionRouter } from "./routes/question.route.js";
import { reponseRouter } from "./routes/reponse.route.js";
import { financeRouter } from "./routes/finance.route.js";
import { commandeRouter } from "./routes/commande.route.js";
import { ingredientRouter } from "./routes/ingredient.route.js";

dotenv.config();


const hostname = "127.0.0.1";
const port = 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", usersRouter);
app.use("/", personnelRouter);
app.use("/", tableRouter);
app.use("/", stockRouter);
app.use("/", serveurRouter);
app.use("/", platRouter);
app.use("/", reservationRouter);
app.use("/", alimentRouter);
app.use("/", questionRouter);
app.use("/", reponseRouter);
app.use("/", financeRouter);
app.use("/", commandeRouter);
app.use("/", ingredientRouter);

app.get("/", async (req, res) => {
  res.send("Hello World!");
  // const languages = await getLanguages();
  // res.send(languages);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});