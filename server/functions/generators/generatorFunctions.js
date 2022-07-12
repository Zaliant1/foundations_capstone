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
      axios
        .get(`http://localhost:4000/api/getplayer/${getNewPlayerName}/`)
        .then((res) => {
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
          rowGeneratorFunction(
            tableHeaderRow,
            playerImgGeneratorFunction,
            null
          );

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
    style: "border-radius: 50%",
  });
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

export const agentPlayersRowGeneratorFunction = (table, element, style) => {
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

  if (style === "universal" || style === null) {
    rowStyling(newPlayerACS, newPlayerKDR, newPlayerKAST);
  } else if (style === "local") {
    tableRowCompareStyle(newPlayerACS, newPlayerKDR, newPlayerKAST);
  }
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

export const playerRowGeneratorFunction = (table, element, style) => {
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

  if (style === "universal" || style === undefined) {
    console.log("switching");
    rowStyling(newPlayerACS, newPlayerKDR, newPlayerKAST);
  } else if (style === "local") {
    console.log("switching");
    tableRowCompareStyle(newPlayerACS, newPlayerKDR, newPlayerKAST);
  }
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

const tableRowCompareStyle = (tableRowACS, tableRowKDR, tableRowKAST) => {
  let averageACS = (
    arrACS.reduce((acc, val) => {
      return acc + val;
    }, 0) / arrACS.length
  ).toFixed(2);

  let averageKDR = (
    arrKDR.reduce((acc, val) => {
      return acc + val;
    }, 0) / arrKDR.length
  ).toFixed(2);

  let toNumKAST = [];

  arrKAST.forEach((el) => {
    let numEl = el.replace("%", "");
    toNumKAST.push(+numEl);
  });

  let averageKAST = (
    toNumKAST.reduce((acc, val) => {
      return acc + val;
    }, 0) / toNumKAST.length
  ).toFixed(2);

  let smallestACS = Math.min(...arrACS.sort((a, b) => a - b));
  let smallestKDR = Math.min(...arrKDR.sort((a, b) => a - b));
  let smallestKAST = Math.min(...toNumKAST.sort((a, b) => a - b));

  let biggestACS = Math.max(...arrACS.sort((a, b) => a - b));
  let biggestKDR = Math.max(...arrKDR.sort((a, b) => a - b));
  let biggestKAST = Math.max(...toNumKAST.sort((a, b) => a - b));
  console.log(...arrACS.sort((a, b) => a - b));
  console.log(...arrKDR.sort((a, b) => a - b));
  console.log(...toNumKAST.sort((a, b) => a - b));

  const rainbowTableACS = new Rainbow();
  rainbowTableACS.setNumberRange(
    Math.trunc(smallestACS),
    averageACS,
    Math.trunc(biggestACS)
  );
  rainbowTableACS.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor = rainbowTableACS.colourAt(tableRowACS.textContent);
  tableRowACS.setAttribute("style", `background-color: #${hexColor}`);

  const rainbowTableKDR = new Rainbow();
  rainbowTableKDR.setNumberRange(smallestKDR, averageKDR, biggestKDR);
  rainbowTableKDR.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor2 = rainbowTableKDR.colourAt(tableRowKDR.textContent);
  tableRowKDR.setAttribute("style", `background-color: #${hexColor2}`);

  const rainbowTableKAST = new Rainbow();
  rainbowTableKAST.setNumberRange(smallestKAST, averageKAST, biggestKAST);
  rainbowTableKAST.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor3 = rainbowTableKAST.colourAt(
    tableRowKAST.textContent.replace("%", "")
  );
  tableRowKAST.setAttribute("style", `background-color: #${hexColor3}`);
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
