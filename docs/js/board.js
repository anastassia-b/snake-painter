const Snake = require('./snake');

class Board {
  constructor(dim) {
    this.dim = dim;
    this.snake = new Snake(this);
    console.log(this.snake);
  }

  static blankGrid(dim) {

  }

  render() {

  }

  validPosition(coord) {

  }
}

module.exports = Board;
