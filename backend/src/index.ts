// import * as http from "http";
import express from "express";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { usersRouter } from "./routes/users.route.js";
import { personnelRouter } from "./routes/personnel.route.js";

dotenv.config();


const hostname = "127.0.0.1";
const port = 5000;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/", usersRouter);
app.use("/", personnelRouter);

app.get("/", async (req, res) => {
  res.send("Hello World!");
  // const languages = await getLanguages();
  // res.send(languages);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});