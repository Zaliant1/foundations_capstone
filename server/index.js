import {
  populateAgent,
  populatePlayer,
  populateTeam,
} from "./functions/controller.js";

import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.listen(4000, () => console.log("up on 4000"));

app.get("/", (req, res) => {
  res.status(200).send();
});

app.get("/api/getagent/:agent", populateAgent);

app.get("/api/getplayer/:player", populatePlayer);

app.get("/api/getteam/:team", populateTeam);
