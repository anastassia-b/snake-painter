const Coordinates = require('./coordinates');

class Snake {
  constructor(board) {
    this.board = board;
    this.dir = "N";
    this.turning = false;

    const center = new Coordinates(Math.floor(board.dim/2), Math.floor(board.dim/2));
    this.segments = [center];
  }

  move() {
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
    this.turning = false;
  }

  turn(dir) {
    console.log(dir);
    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) ||
      this.turning) {
      return;
    } else {
      this.turning = true;
      this.dir = dir;
    }
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  isOccupying(array) {
    let result = false;
    this.segments.forEach( segment => {
      if (segment.i === array[0] && segment.j === array[1]) {
        result = true;
        return result;
      }
    });
    return result;
  }

  isValid() {
    const head = this.head();

    //going off the board
    if (!this.board.validPosition(this.head())) {
      return false;
    }

    //running into own tail
    for (let i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }

    return true;
  }
}

Snake.DIFFS = {
  "N": new Coordinates(-1, 0),
  "E": new Coordinates(0, 1),
  "S": new Coordinates(1, 0),
  "W": new Coordinates(0, -1)
};

Snake.SYMBOL = "S";

module.exports = Snake;
