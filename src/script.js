//Things to do

//Display missedAttacks on DOM
//Fix being able to click the same spot multiple times.
//Finish implementing turn feature
//Make cpu do random plays (adjacent hits once hit if you want). Plays must be within bounds and not twice.
//Allow players to click to place ships
//Finish endGame function

class Ship {
  constructor(shipLength, hits = 0, coordinate = [], sunk = false) {
    this.shipLength = shipLength;
    this.hits = hits;
    this.coordinate = coordinate;
    this.sunk = sunk;
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
    this.ships = [];
    this.pushShipsTEMP();
    this.createBoard();
    this.attacksOnDOM();
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
  }

  attacksOnDOM() {
    const gameBoard = document.getElementById(`${this.name}`);
    Array.from(gameBoard.querySelectorAll(".gameBoardSquare")).forEach(
      (square) =>
        square.addEventListener("click", () => {
          this.receivedAttack([
            Number(square.className[0]),
            Number(square.className[1]),
          ]);
        })
    );
  }

  //coords will come from attacksOnDOM();
  receivedAttack(coordinates) {
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
        this.checkIfSunkAndDelete(i);
        this.checkIfAllSunk();
        return;
      }
    }
    this.missedAttacks.add(coordinates);
    div[0].style.backgroundColor = "red";
  }

  checkIfSunkAndDelete(object) {
    if (object.sunk === true) {
      const index = this.ships.indexOf(object);
      this.ships.splice(index, 1);
      console.log("1 dead");
    }
    return false;
  }
  checkIfAllSunk() {
    this.ships.length === 0 ? this.endGame() : false;
  }

  endGame() {
    console.log("game over");
  }
}

class Player {
  constructor(turn = true, cpu = false) {
    this.turn = turn;
  }
}

let gameBoard1 = new Gameboard("gameBoard1");
let gameBoard2 = new Gameboard("gameBoard2");

let player = new Player();
let computer = new Player(false, true);
