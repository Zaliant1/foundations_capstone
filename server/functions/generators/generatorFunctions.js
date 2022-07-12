import { Rainbow } from "./rainbow.js";

export const htmlRemover = (a, b, c) => {
  if (a) {
    a.innerHTML = "";
  }
  if (b) {
    b.innerHTML = "";
  }
  if (c) {
    c.innerHTML = "";
  }
};

let playerSet = [];

export const clearWatchlistSet = () => {
  htmlRemover(document.getElementById("watchlist"));
  playerSet = [];
};
export const playerWatchlistSet = (nameToPush) => {
  if (!playerSet.includes(nameToPush) && nameToPush !== undefined) {
    playerSet.push(nameToPush);
  }

  return playerSet;
};

export const playerWatchlistGeneratorFunction = (
  getWatchlist,
  playerIGN,
  playerImages
) => {
  let div = document.createElement("div");
  let li = document.createElement("li");
  li.textContent = playerIGN;
  let playerImg = document.createElement("img");
  Object.assign(playerImg, {
    src: playerImages(playerIGN).toLowerCase(),
    id: "player-image",
    style: "width: 7% ; border-radius: 50%",
  });
  playerImg.setAttribute(
    "onerror",
    "this.src = 'https://assets.valorantesports.com/val/vct-logo.21d0c9ddeb.svg';"
  );

  let removeButton = document.createElement("button");
  removeButton.textContent = "remove";

  removeButton.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  });
  getWatchlist.appendChild(div).appendChild(li).appendChild(playerImg);

  getWatchlist.appendChild(div).appendChild(removeButton);
};

export const teamPlayerListGeneratorFunction = (
  resdata,
  teamName,
  getTable,
  getPlayerID,
  playerImgFn,
  getImgContainer
) => {
  let div = document.createElement("div");
  div.setAttribute("id", "activeCells");
  let table = document.createElement("table");
  let playerName = document.createElement("th");
  playerName.textContent = "Player";
  playerName.setAttribute("style", "text-align:center");
  document
    .getElementById(`${teamName}-container`)
    .appendChild(div)
    .appendChild(table)
    .appendChild(playerName);

  resdata.forEach((el) => {
    let playerRow = document.createElement("tr");
    Object.assign(playerRow, {
      id: "player-line",
      style: "width: 100%",
    });
    let newPlayerName = document.createElement("td");
    newPlayerName.setAttribute("style", "text-align:center");
    newPlayerName.textContent = el.IGN;
    let getNewPlayerName = newPlayerName.textContent.toLowerCase();

    document
      .getElementById(`${teamName}-container`)
      .appendChild(div)
      .appendChild(table)
      .appendChild(playerRow)
      .appendChild(newPlayerName);

    newPlayerName.onclick = () => {
      axios.get(`/api/getplayer/${getNewPlayerName}/`).then((res) => {
        htmlRemover(getTable, getImgContainer);
        if (document.getElementById("player-h2"))
          document.getElementById("player-h2").remove();

        let h2 = document.createElement("h2");
        h2.textContent = res.data.IGN;
        h2.setAttribute("id", "player-h2");

        getPlayerID.appendChild(h2);

        playerImgGeneratorFunction(playerImgFn(getNewPlayerName));

        let tableHeaderRow = document.createElement("tr");
        tableHeaderRow.setAttribute("id", "table-header-containers");
        getTable.appendChild(tableHeaderRow);
        rowGeneratorFunction(tableHeaderRow, playerImgGeneratorFunction, null);

        playerRowGeneratorFunction(getTable, res.data);
      });
    };
  });
};

export const agentImgGeneratorFunction = (image) => {
  let img = document.createElement("img");
  Object.assign(img, {
    src: `${image}`,
    className: "agent-image",
  });
  document.getElementById("img-container").appendChild(img);
};

export const playerImgGeneratorFunction = (image) => {
  let img = document.createElement("img");
  Object.assign(img, {
    src: `${image}`,
    id: "player-image",
    style: "border-radius: 50%; width: 240px",
  });
  img.setAttribute(
    "onerror",
    "this.src = 'https://assets.valorantesports.com/val/vct-logo.21d0c9ddeb.svg';"
  );

  document.getElementById("img-container").appendChild(img);
};

export const rowGeneratorFunction = (
  tableHeaderRow,
  player,
  agent,
  compare
) => {
  let iglHeader = document.createElement("th");
  iglHeader.textContent = "IGL";
  let playerName = document.createElement("th");
  playerName.textContent = "Player";
  let acsHeader = document.createElement("th");
  acsHeader.textContent = "ACS";
  let kdrHeader = document.createElement("th");
  kdrHeader.textContent = "KDR";
  let kastHeader = document.createElement("th");
  kastHeader.textContent = "KAST";
  let roleHeader = document.createElement("th");
  roleHeader.textContent = "ROLE";
  if (player) {
    tableHeaderRow.appendChild(iglHeader);
    tableHeaderRow.appendChild(acsHeader);
    tableHeaderRow.appendChild(kdrHeader);
    tableHeaderRow.appendChild(kastHeader);
    tableHeaderRow.appendChild(roleHeader);
  } else if (agent) {
    tableHeaderRow.appendChild(playerName);
    tableHeaderRow.appendChild(acsHeader);
    tableHeaderRow.appendChild(kdrHeader);
    tableHeaderRow.appendChild(kastHeader);
    tableHeaderRow.appendChild(roleHeader);
  } else if (compare) {
    tableHeaderRow.appendChild(playerName);
    tableHeaderRow.appendChild(iglHeader);
    tableHeaderRow.appendChild(acsHeader);
    tableHeaderRow.appendChild(kdrHeader);
    tableHeaderRow.appendChild(kastHeader);
    tableHeaderRow.appendChild(roleHeader);
  }
};

export const agentPlayersRowGeneratorFunction = (table, element) => {
  let playerRow = document.createElement("tr");
  Object.assign(playerRow, {
    id: "player-line",
    style: "width: 100%",
  });

  let newPlayerName = document.createElement("td");
  newPlayerName.setAttribute("style", "text-align:center");
  newPlayerName.textContent = element.IGN;

  let newPlayerACS = document.createElement("td");
  newPlayerACS.setAttribute("style", "text-align:center");
  newPlayerACS.textContent = element.ACS;
  let newPlayerKDR = document.createElement("td");
  newPlayerKDR.setAttribute("style", "text-align:center");
  newPlayerKDR.textContent = element.KDR;
  let newPlayerKAST = document.createElement("td");
  newPlayerKAST.setAttribute("style", "text-align:center");
  newPlayerKAST.textContent = element.KAST;
  let newPlayerRole = document.createElement("td");
  newPlayerRole.textContent = element.Role;

  table.appendChild(playerRow).appendChild(newPlayerName);
  table.appendChild(playerRow).appendChild(newPlayerACS);
  table.appendChild(playerRow).appendChild(newPlayerKDR);
  table.appendChild(playerRow).appendChild(newPlayerKAST);
  table.appendChild(playerRow).appendChild(newPlayerRole);

  rowStyling(newPlayerACS, newPlayerKDR, newPlayerKAST);
};

export const watchlistCompareRowGeneratorFunction = (table, element) => {
  let playerRow = document.createElement("tr");
  Object.assign(playerRow, {
    id: "player-line",
    style: "width: 100%",
  });

  let newPlayerIGL = document.createElement("td");
  newPlayerIGL.setAttribute("style", "text-align:center");
  if (element.IGL) {
    newPlayerIGL.textContent = String.fromCharCode(10003);
  } else {
    newPlayerIGL.textContent = String.fromCharCode(10005);
  }

  let newPlayerName = document.createElement("td");
  newPlayerName.setAttribute("style", "text-align:center");
  newPlayerName.textContent = element.IGN;
  let newPlayerACS = document.createElement("td");
  newPlayerACS.setAttribute("style", "text-align:center");
  newPlayerACS.textContent = element.ACS;
  let newPlayerKDR = document.createElement("td");
  newPlayerKDR.setAttribute("style", "text-align:center");
  newPlayerKDR.textContent = element.KDR;
  let newPlayerKAST = document.createElement("td");
  newPlayerKAST.setAttribute("style", "text-align:center");
  newPlayerKAST.textContent = element.KAST;
  let newPlayerRole = document.createElement("td");
  newPlayerRole.setAttribute("style", "text-align:center");
  newPlayerRole.textContent = element.Role;

  table.appendChild(playerRow).appendChild(newPlayerName);
  table.appendChild(playerRow).appendChild(newPlayerIGL);
  table.appendChild(playerRow).appendChild(newPlayerACS);
  table.appendChild(playerRow).appendChild(newPlayerKDR);
  table.appendChild(playerRow).appendChild(newPlayerKAST);
  table.appendChild(playerRow).appendChild(newPlayerRole);
  rowStyling(newPlayerACS, newPlayerKDR, newPlayerKAST);
};

export const playerRowGeneratorFunction = (table, element) => {
  let playerRow = document.createElement("tr");
  Object.assign(playerRow, {
    id: "player-line",
    style: "width: 100%",
  });
  let newPlayerIGL = document.createElement("td");
  newPlayerIGL.setAttribute("style", "text-align:center");
  if (element.IGL) {
    newPlayerIGL.textContent = String.fromCharCode(10003);
  } else {
    newPlayerIGL.textContent = String.fromCharCode(10005);
  }
  let newPlayerName = document.createElement("td");
  newPlayerName.setAttribute("style", "text-align:center");
  newPlayerName.textContent = element.IGN;
  let newPlayerACS = document.createElement("td");
  newPlayerACS.setAttribute("style", "text-align:center");
  newPlayerACS.textContent = element.ACS;
  let newPlayerKDR = document.createElement("td");
  newPlayerKDR.setAttribute("style", "text-align:center");
  newPlayerKDR.textContent = element.KDR;
  let newPlayerKAST = document.createElement("td");
  newPlayerKAST.setAttribute("style", "text-align:center");
  newPlayerKAST.textContent = element.KAST;
  let newPlayerRole = document.createElement("td");
  newPlayerRole.setAttribute("style", "text-align:center");
  newPlayerRole.textContent = element.Role;

  table.appendChild(playerRow).appendChild(newPlayerIGL);
  table.appendChild(playerRow).appendChild(newPlayerACS);
  table.appendChild(playerRow).appendChild(newPlayerKDR);
  table.appendChild(playerRow).appendChild(newPlayerKAST);
  table.appendChild(playerRow).appendChild(newPlayerRole);

  rowStyling(newPlayerACS, newPlayerKDR, newPlayerKAST);
};

let arrACS = [];
let arrKDR = [];
let arrKAST = [];
export const rangeFinders = (element) => {
  arrACS.push(element.ACS);
  arrKDR.push(element.KDR);
  arrKAST.push(element.KAST.replace("%", ""));
};

export const rowStyling = (tableRow2, tableRow3, tableRow4) => {
  tableRow2Style(tableRow2);
  tableRow3Style(tableRow3);
  tableRow4Style(tableRow4);
};

const tableRow2Style = (tableRow) => {
  const rainbowTableTwo = new Rainbow();
  rainbowTableTwo.setNumberRange(150, 220, 275);
  rainbowTableTwo.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor = rainbowTableTwo.colourAt(tableRow.textContent);
  tableRow.setAttribute("style", `background-color: #${hexColor}`);
};

const tableRow3Style = (tableRow) => {
  const rainbowTableThree = new Rainbow();
  rainbowTableThree.setNumberRange(0.75, 1.025, 1.7);
  rainbowTableThree.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor = rainbowTableThree.colourAt(tableRow.textContent);
  tableRow.setAttribute("style", `background-color: #${hexColor}`);
};

const tableRow4Style = (tableRow) => {
  const rainbowTableFour = new Rainbow();
  rainbowTableFour.setNumberRange(63, 72.5, 82);
  rainbowTableFour.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor = rainbowTableFour.colourAt(
    tableRow.textContent.replace("%", "")
  );
  tableRow.setAttribute("style", `background-color: #${hexColor}`);
};
