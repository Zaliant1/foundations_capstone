import { Rainbow } from "./rainbow.js";

export const htmlRemover = (a, b) => {
  if (a) {
    a.innerHTML = "";
  }
  if (b) {
    b.innerHTML = "";
  }
  //   if (c) {
  //     c.innerHTML = "";
  //   }
  //   if (d) {
  //     d.innerHTML = "";
  //   }
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
    className: "player-image",
    style: "border-radius: 50%",
  });
  document.getElementById("img-container").appendChild(img);
};

export const rowGeneratorFunction = (tableHeaderRow, player, agent) => {
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
  }
};

export const agentPlayersRowGeneratorFunction = (table, element) => {
  let playerRow = document.createElement("tr");
  Object.assign(playerRow, {
    id: "player-line",
    style: "width: 100%",
  });
  let newPlayerIGL = document.createElement("td");
  newPlayerIGL.textContent = "In Game Leader";
  let newPlayerName = document.createElement("td");
  newPlayerName.textContent = element.IGN;
  let newPlayerACS = document.createElement("td");
  newPlayerACS.textContent = element.ACS;
  let newPlayerKDR = document.createElement("td");
  newPlayerKDR.textContent = element.KDR;
  let newPlayerKAST = document.createElement("td");
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

export const playerRowGeneratorFunction = (table, element) => {
  let playerRow = document.createElement("tr");
  Object.assign(playerRow, {
    id: "player-line",
    style: "width: 100%",
  });
  let newPlayerIGL = document.createElement("td");
  if (element.IGL) {
    newPlayerIGL.textContent = String.fromCharCode(10003);
  } else {
    newPlayerIGL.textContent = String.fromCharCode(10005);
  }
  let newPlayerName = document.createElement("td");
  newPlayerName.textContent = element.IGN;
  let newPlayerACS = document.createElement("td");
  newPlayerACS.textContent = element.ACS;
  let newPlayerKDR = document.createElement("td");
  newPlayerKDR.textContent = element.KDR;
  let newPlayerKAST = document.createElement("td");
  newPlayerKAST.textContent = element.KAST;
  let newPlayerRole = document.createElement("td");
  newPlayerRole.textContent = element.Role;

  table.appendChild(playerRow).appendChild(newPlayerIGL);
  table.appendChild(playerRow).appendChild(newPlayerACS);
  table.appendChild(playerRow).appendChild(newPlayerKDR);
  table.appendChild(playerRow).appendChild(newPlayerKAST);
  table.appendChild(playerRow).appendChild(newPlayerRole);

  rowStyling(newPlayerACS, newPlayerKDR, newPlayerKAST);
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
  const rainbowTableTwo = new Rainbow();
  rainbowTableTwo.setNumberRange(0.75, 1.025, 1.7);
  rainbowTableTwo.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor = rainbowTableTwo.colourAt(tableRow.textContent);
  tableRow.setAttribute("style", `background-color: #${hexColor}`);
};

const tableRow4Style = (tableRow) => {
  const rainbowTableTwo = new Rainbow();
  rainbowTableTwo.setNumberRange(63, 72.5, 82);
  rainbowTableTwo.setSpectrum("e06666", "ffd966", "93c47d");
  let hexColor = rainbowTableTwo.colourAt(
    tableRow.textContent.replace("%", "")
  );
  tableRow.setAttribute("style", `background-color: #${hexColor}`);
};
