import { agentImages } from "./images/agentimages.js";
import { playerImages } from "./images/playerimages.js";
import {
  playerImgGeneratorFunction,
  agentImgGeneratorFunction,
  rowGeneratorFunction,
  agentPlayersRowGeneratorFunction,
  playerRowGeneratorFunction,
  teamPlayerListGeneratorFunction,
  playerWatchlistGeneratorFunction,
  playerWatchlistSet,
  clearWatchlistSet,
  watchlistCompareRowGeneratorFunction,
  htmlRemover,
  rangeFinders,
} from "./generators/generatorFunctions.js";

const playerGetForm = document.getElementById("get-player-form");
const playerGetInput = document.getElementById("get-player-input");
const getPlayerID = document.getElementById("players");
const getTable = document.getElementById("player-table");
const getImgContainer = document.getElementById("img-container");
const getPlayerH2 = document.getElementById("player-h2");
const getWatchlist = document.getElementById("watchlist");

const watchlistCompare = () => {
  htmlRemover(getTable, getImgContainer, getPlayerH2);
  let tableHeaderRow = document.createElement("tr");
  tableHeaderRow.setAttribute("id", "table-header-containers");
  getTable.appendChild(tableHeaderRow);
  rowGeneratorFunction(tableHeaderRow, null, null, "compare");

  axios.get(`/api/getwatchlisttocompare`).then((res) => {
    res.data.forEach((el) => {
      axios.get(`/api/getplayer/${el}/`).then((res) => {
        rangeFinders(res.data);
        watchlistCompareRowGeneratorFunction(getTable, res.data);
      });
    });
  });
};

document
  .getElementById("watchlist-compare")
  .addEventListener("click", watchlistCompare);

document
  .getElementById("watchlist-clear")
  .addEventListener("click", () => clearWatchlistSet());

const playerWatchlist = () => {
  htmlRemover(document.getElementById("watchlist"));
  let playerName = document
    .getElementById("player-h2")
    .textContent.toLowerCase();

  if (document.getElementById("player-h2")) {
    playerWatchlistSet(playerName).forEach((el) => {
      playerWatchlistGeneratorFunction(getWatchlist, el, playerImages);
      axios.post(`/api/getwatchlist/${el}`).then((res) => {
        htmlRemover(getTable, getImgContainer, getPlayerH2);
        if (document.getElementById("player-h2"))
          document.getElementById("player-h2").remove();
      });
    });
  }
};

document
  .getElementById("watchlist-add")
  .addEventListener("click", playerWatchlist);

const teamIconDropDownHandler = () => {
  htmlRemover(getTable, getImgContainer, getPlayerH2);

  document.onclick = (e) => {
    let teamName = String(e.target.id);
    const getPlayerListContainer = document.getElementById("activeCells");
    if (getPlayerListContainer) {
      getPlayerListContainer.remove();
    } else if (e.target.classList.contains("team-icons")) {
      axios.get(`/api/getteam/${teamName}/`).then((res) => {
        teamPlayerListGeneratorFunction(
          res.data,
          teamName,
          getTable,
          getPlayerID,
          playerImages,
          getImgContainer
        );
      });
    }
  };
};

Array.from(document.getElementsByClassName("team-icon-container")).forEach(
  (el) => {
    el.addEventListener("click", teamIconDropDownHandler);
  }
);

const iconClickHandler = () => {
  htmlRemover(getTable, getImgContainer, getPlayerH2);

  document.onclick = (e) => {
    let agentName = String(e.target.id);

    if (e.target.classList.contains("agents")) {
      axios.get(`/api/getagent/${agentName}/`).then((res) => {
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
  htmlRemover(getTable, getImgContainer, getPlayerH2);
  let { name } = body;

  axios.get(`/api/getplayer/${name}/`).then((res) => {
    let h2 = document.createElement("h2");
    h2.textContent = res.data.IGN;
    h2.setAttribute("id", "player-h2");

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
  if (document.getElementById("player-h2"))
    document.getElementById("player-h2").remove();
});
