class Ship {
  constructor(length, hits = 0, sunk = false) {
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
  }

  hit() {
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    this.hits === this.length ? (this.sunk = true) : false;
  }
}
// 5 Ships, Lengths = 5, 4, 3, 3, 2 | Horizontal/Vertical Axis

// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
// Gameboards should be able to report whether or not all of their ships have been sunk.

let counter = 1;
class Gameboard {
  constructor(missedAttacks = [], allSunk = false) {
    this.missedAttacks = missedAttacks;
    this.allSunk = allSunk;
    this.ships = {
      ship1: ["00", "05"],
      ship2: ["00", "05"],
      ship3: ["00", "05"],
      ship4: ["00", "05"],
      ship5: ["00", "05"],
    };
    this.createBoard();
  }

  // placeShip(coordinates) {

  //   let ship = new Ship(length);
  //   this.ships.push(ship);
  // }

  createBoard() {
    const gameBoard = document.getElementById(`gameBoard${counter}`);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.id = `${i}${j}`;
        gameBoard.appendChild(div);
      }
    }

    //Example: coordinates = [00, 05] or coordinates = [00, 50]
    //Example: coordinates = [44, 48] or coordinates = [44, 84]

    for (const i of this.ships) {
      if (JSON.stringify(i[0][0]) === JSON.stringify(i[1][0])) {
        let length = parseInt(i[1][0]) - parseInt(i[0][0]);
        let ship = new Ship(length);
      } else if (JSON.stringify(i[0][1]) === JSON.stringify(i[1][1])) {
        let length = parseInt(i[1][1]) - parseInt(i[0][1]);
        let ship = new Ship(length);
      }
      const square = document.getElementById();
      square.style.backgroundColor = "blue";
    }
  }

  receiveAttack(coordinates) {
    //check if hit or not, then send the hit function to ship or record coordinates if not hit.
  }
}

let gameboard1 = new Gameboard();
counter++;
let gameboard2 = new Gameboard();

class Player {
  constructor(turn = true, cpu = false) {
    this.turn = turn;
  }
}

let player = new Player();
let computer = new Player(false, true);
