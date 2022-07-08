import { agentImages } from "./images/agentimages.js";
import { playerImages } from "./images/playerimages.js";
import {
  playerImgGeneratorFunction,
  agentImgGeneratorFunction,
  rowGeneratorFunction,
  agentPlayersRowGeneratorFunction,
  playerRowGeneratorFunction,
  htmlRemover,
} from "./generators/generatorFunctions.js";

const playerGetForm = document.getElementById("get-player-form");
const playerGetInput = document.getElementById("get-player-input");
const getPlayerID = document.getElementById("players");
const getTable = document.getElementById("player-table");
const getImgContainer = document.getElementById("img-container");

const iconClickHandler = () => {
  htmlRemover(getTable, getImgContainer);

  document.onclick = (e) => {
    let agentName = String(e.target.id);

    if (e.target.classList.contains("agents")) {
      axios
        .get(`http://localhost:4000/api/getagent/${agentName}/`)
        .then((res) => {
          let tableHeaderRow = document.createElement("tr");
          tableHeaderRow.setAttribute("id", "table-header-containers");
          getTable.appendChild(tableHeaderRow);
          agentImgGeneratorFunction(agentImages(agentName));
          rowGeneratorFunction(tableHeaderRow, null, agentImgGeneratorFunction);
          res.data.forEach((el) => {
            agentPlayersRowGeneratorFunction(getTable, el);
          });
        });
    }
  };
};

const requestPlayer = (body) => {
  htmlRemover(getTable, getImgContainer);
  let { name } = body;

  console.log(name);
  axios.get(`http://localhost:4000/api/getplayer/${name}/`).then((res) => {
    let h2 = document.createElement("h2");
    h2.textContent = res.data.IGN;
    getPlayerID.appendChild(h2);

    playerImgGeneratorFunction(playerImages(name));

    let tableHeaderRow = document.createElement("tr");
    tableHeaderRow.setAttribute("id", "table-header-containers");
    getTable.appendChild(tableHeaderRow);
    rowGeneratorFunction(tableHeaderRow, playerImgGeneratorFunction, null);

    playerRowGeneratorFunction(getTable, res.data);
  });
};

const formHandler = (e) => {
  e.preventDefault();
  let body = {
    name: playerGetInput.value,
  };

  requestPlayer(body);
  playerGetInput.value = "";
};

playerGetForm.addEventListener("submit", formHandler);

Array.from(document.getElementsByClassName("agents")).forEach((el) => {
  el.addEventListener("click", iconClickHandler);
});

document.getElementById("clear-button").addEventListener("click", () => {
  htmlRemover(getTable, getImgContainer);
});
