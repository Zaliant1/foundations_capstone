import {
  populateAgent,
  populatePlayer,
  populateTeam,
  populateWatchlist,
  getWatchlist,
} from "./functions/controller.js";

import express from "express";
import cors from "cors";
import path from "path";
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`up on ${port}`));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "server")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

app.get("/api/getagent/:agent", populateAgent);

app.get("/api/getplayer/:player", populatePlayer);

app.post("/api/getwatchlist/:player", populateWatchlist);

app.get("/api/getwatchlisttocompare/", getWatchlist);

app.get("/api/getteam/:team", populateTeam);
