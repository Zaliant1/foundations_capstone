import { agents } from "../../Data/Agents/agentData";
import { players } from "../../Data/Players/playerData";

export const populateAgent = (req, res) => {
  let agent = req.params.agent;
  res.status(200).send(agents[agent]);
};

export const populatePlayer = (req, res) => {
  let player = req.params.player;
  res.status(200).send(players[player]);
};
