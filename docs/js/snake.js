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

  }

  turn(dir) {

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

};

module.exports = Snake;
