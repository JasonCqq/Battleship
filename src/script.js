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

// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
class Gameboard {
  constructor(missedAttacks = [], allSunk = false) {
    this.missedAttacks = missedAttacks;
    this.allSunk = allSunk;
    this.board;
  }

  createBoard() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  receiveAttack(coordinates) {
    //check if hit or not, then send the hit function to ship or record coordinates if not hit.
  }
}

class Player {}
