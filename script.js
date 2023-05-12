//Things to do

//Just need CPU to generate random ships.

class Player {
  constructor(cpu = false, turn) {
    this.turn = turn;
    this.cpu = cpu;
  }
}

const player = new Player(false, true);
const CPU = new Player(true, false);

class Ship {
  constructor(shipLength, hits = 0, coordinate = [], sunk = false, shipNumber) {
    this.shipLength = shipLength;
    this.hits = hits;
    this.coordinate = coordinate;
    this.sunk = sunk;
    this.shipNumber = shipNumber;
  }

  hit() {
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    this.hits === this.shipLength ? (this.sunk = true) : false;
  }
}
// 5 Ships, Lengths = 5, 4, 3, 3, 2 | Horizontal/Vertical Axis

class Gameboard {
  constructor(name) {
    this.name = name;
    this.missedAttacks = new Set();
    this.landedAttacks = new Set();
    this.ships = [];
  }

  createBoard() {
    const gameBoard = document.getElementById(`${this.name}`);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.classList.add(`${i}${j}`);
        div.classList.add("gameBoardSquare");
        gameBoard.appendChild(div);
      }
    }
    //Iterate over ships, and display on DOM
    //Example: i.coordinate = [[0, 5], [0, 6]]

    if (this.name === "gameBoard2") {
      this.attacksOnDOM();
      return;
    }

    for (const i of this.ships) {
      let square;
      let iterator;
      if (
        JSON.stringify(i.coordinate[0][0]) ===
        JSON.stringify(i.coordinate[1][0])
      ) {
        iterator = i.coordinate[0][1];
        for (let j = 0; j < i.shipLength; j++) {
          square = gameBoard.getElementsByClassName(
            `${i.coordinate[0][0]}${iterator}`
          );
          square[0].style.backgroundColor = "blue";
          iterator++;
        }
      } else {
        iterator = i.coordinate[0][0];
        for (let j = 0; j < i.shipLength; j++) {
          square = gameBoard.getElementsByClassName(
            `${iterator}${i.coordinate[0][1]}`
          );
          square[0].style.backgroundColor = "blue";
          iterator++;
        }
      }
    }
    this.attacksOnDOM();
  }

  attacksOnDOM() {
    if (player.turn !== true) {
      return;
    }
    const gameBoard = document.getElementById(`${this.name}`);
    Array.from(gameBoard.querySelectorAll(".gameBoardSquare")).forEach(
      (square) =>
        square.addEventListener("click", () => {
          this.receivedAttack([
            Number(square.className[0]),
            Number(square.className[1]),
          ]);
          player.turn = false;
          CPU.turn = true;
          this.computerAttacksOnDOM();
        })
    );
  }

  //temp function, remove after letting user pick where to place ships
  pushShipsTEMP() {
    let ship1 = new Ship(
      5,
      0,
      [
        [0, 5],
        [0, 9],
      ],
      false
    );
    let ship2 = new Ship(
      4,
      0,
      [
        [5, 2],
        [8, 2],
      ],
      false
    );
    let ship3 = new Ship(
      3,
      0,
      [
        [2, 3],
        [2, 5],
      ],
      false
    );
    let ship4 = new Ship(
      3,
      0,
      [
        [7, 9],
        [9, 9],
      ],
      false
    );
    let ship5 = new Ship(
      2,
      0,
      [
        [7, 0],
        [8, 0],
      ],
      false
    );
    this.ships.push(ship1, ship2, ship3, ship4, ship5);
  }

  computerAttacksOnDOM() {
    if (CPU.turn !== true) {
      return;
    }

    gameBoard1.receivedAttack(this.generateCoordinates());
    CPU.turn = false;
    player.turn = true;
  }

  //cpu moves
  generateCoordinates() {
    let randomCoordinate = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    while (
      this.landedAttacks.has(
        JSON.stringify(randomCoordinate) &&
          this.missedAttacks.has(JSON.stringify(randomCoordinate))
      )
    ) {
      randomCoordinate = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
    }

    return randomCoordinate;
  }

  //coords will come from attacksOnDOM();
  receivedAttack(coordinates) {
    if (
      this.landedAttacks.has(JSON.stringify(coordinates)) ||
      this.missedAttacks.has(JSON.stringify(coordinates))
    ) {
      return;
    }

    const gameBoard = document.getElementById(`${this.name}`);
    let div = gameBoard.getElementsByClassName(
      `${coordinates[0]}${coordinates[1]}`
    );
    for (const i of this.ships) {
      if (
        coordinates[0] === i.coordinate[0][0] &&
        coordinates[1] <= i.coordinate[1][1] &&
        coordinates[1] >= i.coordinate[0][1]
      ) {
        i.hit();
        div[0].style.backgroundColor = "lightblue";
        this.landedAttacks.add(JSON.stringify(coordinates));
        this.checkIfSunkAndDelete(i);
        this.checkIfAllSunk();
        return;
      } else if (
        coordinates[1] === i.coordinate[0][1] &&
        coordinates[0] <= i.coordinate[1][0] &&
        coordinates[0] >= i.coordinate[0][0]
      ) {
        i.hit();
        div[0].style.backgroundColor = "lightblue";
        this.landedAttacks.add(JSON.stringify(coordinates));
        this.checkIfSunkAndDelete(i);
        this.checkIfAllSunk();
        return;
      }
    }
    this.missedAttacks.add(JSON.stringify(coordinates));
    div[0].style.backgroundColor = "red";
  }

  checkIfSunkAndDelete(object) {
    if (object.sunk === true) {
      const index = this.ships.indexOf(object);
      this.ships.splice(index, 1);
    }
    return false;
  }
  checkIfAllSunk() {
    this.ships.length === 0 ? this.endGame() : false;
  }
  endGame() {
    const p = document.createElement("p");
    const results = document.getElementById("results");
    const main = document.getElementById("main");

    if (this.name === "gameBoard2") {
      p.textContent = "Player wins";
      results.appendChild(p);
      results.style.display = "flex";
      main.remove();
    } else {
      p.textContent = "Computer wins";
      results.appendChild(p);
      results.style.display = "flex";
      main.remove();
    }
  }
}

const gameBoard1 = new Gameboard("gameBoard1");
const gameBoard2 = new Gameboard("gameBoard2");

function createPreGameBoard() {
  //create 10x10
  const gameBoard = document.getElementById(`preGameBoard`);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const div = document.createElement("div");
      div.classList.add(`${i}${j}`);
      div.classList.add("gameBoardSquare");
      gameBoard.appendChild(div);
    }
  }

  const axisButton = document.getElementById("axisButton");
  axisButton.addEventListener("click", () => {
    axisButton.innerText === "HORIZONTAL"
      ? (axisButton.innerText = "VERTICAL")
      : (axisButton.innerText = "HORIZONTAL");
  });

  const mainPage = document.getElementById("mainPage");
  const main = document.getElementById("main");
  const shipLengthDOM = document.getElementById("shipLength");
  const tempArray = Array.from(gameBoard.querySelectorAll(".gameBoardSquare"));

  const shipLengthArray = [5, 4, 3, 3, 2];
  let shipCounter = 1;

  tempArray.forEach((div) =>
    div.addEventListener("click", () => {
      let squareNumber = div.classList[0].split("");
      shipLengthDOM.innerText = shipLengthArray.shift();
      if (axisButton.innerText === "HORIZONTAL") {
        //  constructor(shipLength, hits = 0, coordinate = [], sunk = false, shipNumber)
        let ship = new Ship(
          shipLengthDOM.innerText[shipLengthDOM.innerText.length - 1],
          0,
          [
            [Number(squareNumber[0]), Number(squareNumber[1])],
            [
              Number(squareNumber[0]),
              Number(squareNumber[1]) + Number(shipLengthDOM.innerText),
            ],
          ],
          false,
          shipCounter
        );
        paintSquare([Number(squareNumber[0]), Number(squareNumber[1])]);
        gameBoard1.ships.push(ship);

        if (shipLengthArray.length === 0) {
          mainPage.remove();
          mainPage.style.display = "none";
          main.style.display = "flex";
          gameBoard1.createBoard();
          gameBoard2.pushShipsTEMP();
          gameBoard2.createBoard();
        }
      } else if (axisButton.innerText === "VERTICAL") {
        let ship = new Ship(
          shipLengthDOM.innerText[shipLengthDOM.innerText.length - 1],
          0,
          [
            [Number(squareNumber[0]), Number(squareNumber[1])],
            [
              Number(squareNumber[0]) + Number(shipLengthDOM.innerText),
              Number(squareNumber[1]),
            ],
          ],
          false,
          shipCounter
        );
        paintSquare([Number(squareNumber[0]), Number(squareNumber[1])]);
        gameBoard1.ships.push(ship);

        if (shipLengthArray.length === 0) {
          mainPage.remove();
          mainPage.style.display = "none";
          main.style.display = "flex";
          gameBoard1.createBoard();
          gameBoard2.pushShipsTEMP();
          gameBoard2.createBoard();
        }
      }
    })
  );

  function paintSquare(i) {
    let square;
    let iterator = Number(shipLengthDOM.innerText);
    if (axisButton.innerText === "HORIZONTAL") {
      let reference = i[1];
      for (let j = 0; j < iterator; j++) {
        square = gameBoard.getElementsByClassName(`${i[0]}${reference}`);
        reference++;
        square[0].style.backgroundColor = "blue";
      }
    } else {
      let reference = i[0];
      for (let j = 0; j < iterator; j++) {
        square = gameBoard.getElementsByClassName(`${reference}${i[1]}`);
        reference++;
        square[0].style.backgroundColor = "blue";
      }
    }
  }
}
createPreGameBoard();
