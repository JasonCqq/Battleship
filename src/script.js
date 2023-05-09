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

let counter = 1;
class Gameboard {
  constructor(missedAttacks = [], allSunk = false) {
    this.missedAttacks = missedAttacks;
    this.allSunk = allSunk;
    this.ships = [];
    this.pushShipsTEMP();
    this.createBoard();
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
    const gameBoard = document.getElementById(`gameBoard${counter}`);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.id = `${i}${j}`;
        gameBoard.appendChild(div);
      }
    }

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
          square = document.getElementById(`${i.coordinate[0][0]}${iterator}`);
          square.style.backgroundColor = "blue";
          iterator++;
        }
      } else {
        iterator = i.coordinate[0][0];
        for (let j = 0; j < i.shipLength; j++) {
          square = document.getElementById(`${iterator}${i.coordinate[0][1]}`);
          square.style.backgroundColor = "blue";
          iterator++;
        }
      }
    }
  }

  receivedAttack(coordinates) {
    //check if hit or not, then send the hit function to ship or record coordinates if not hit.
  }

  checkIfAllSunk() {
    this.ships.length !== 0 ? (this.allSunk = true) : (this.allSunk = false);
  }
}

let gameboard1 = new Gameboard();
// counter++;
// let gameboard2 = new Gameboard();

class Player {
  // if cpu is true, random moves within bounds, and can't shoot same spot twice.
  constructor(turn = true, cpu = false) {
    this.turn = turn;
  }
}

let player = new Player();
let computer = new Player(false, true);
