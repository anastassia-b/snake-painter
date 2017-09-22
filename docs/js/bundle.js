/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(3);

const randomColorString = function() {
  return '#' + Math.random().toString(16).substr(-4) + '00';
};

class View {
  constructor($el) {
    this.$el = $el;
    this.setupBoard();

    this.board = new Board(30);
    console.log(this.board);

    this.intervalId = window.setInterval(
      this.step.bind(this), View.STEP_MILLIS
    );

    this.$li = this.$el.find("li");

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  setupBoard() {
    this.addButtons();

    const $board = $("<figure>").addClass("board");

    for (let i = 0; i < 30; i++) {
      this.addRow($board);
    }

    this.$el.append($board);
  }

  addButtons() {
    const $levels = $("<nav>").addClass("levels");
    for (let i = 0; i <= 4; i++) {
      const $button = $("<button>").html(`Level ${i}`);
      $button.on("click", this[`level${i}`]);
      $levels.append($button);
    }
    this.$el.append($levels);
  }

  addRow($board) {
    const rowIdx = this.$el.find(".row").length;
    const $row = $("<ul>").addClass("row").addClass("group");
    for (let colIdx = 0; colIdx < 30; colIdx++) {
      const $square = $("<li>").addClass("square").attr("data-pos", [rowIdx, colIdx]);

      $row.append($square);
    }
    $board.append($row);
  }

  level0() {
    $('.square').on("mouseover", e => {
      const $sq = $(e.currentTarget);
      $sq.css("background-color", randomColorString());
    });
  }

  handleKeyEvent(event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    }
  }

  render() {
    this.updateClasses(this.board.snake.segments, "snake");
  }

  updateClasses(coords, className) {
    this.$li.filter(`.${className}`).removeClass();

    coords.forEach( coord => {
      const flatCoord = (coord.i * this.board.dim) + coord.j;
      console.log("flatCoord", flatCoord);
      // this.$li.eq(flatCoord).addClass(className);
      this.$li.eq(flatCoord).css("background-color", randomColorString());
    });
  }

  step() {
    //hard coded for now so not infinite loop
    if (this.board.snake.segments.length !== 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("Game over!");
      window.clearInterval(this.intervalId);
    }
  }

}


View.KEYS = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

View.STEP_MILLIS = 100;

module.exports = View;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(5);

class Board {
  constructor(dim) {
    this.dim = dim;
    this.snake = new Snake(this);
  }

  static blankGrid(dim) {
    const grid = [];

    for (let i = 0; i < dim; i++) {
      const row = [];
      for (let j = 0; j < dim; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }

    return grid;
  }

  render() {
    const grid = Board.blankGrid(this.dim);

    this.snake.segments.forEach( segment => {
      grid[segment.i][segment.j] = Snake.SYMBOL;
    });

  }

  validPosition(coord) {
    return (coord.i >= 0) && (coord.i < this.dim) && (coord.j >= 0) && (coord.j < this.dim);
  }
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(1);

$(function () {
  const rootEl = $('.snake-painter-game');
  new View(rootEl);
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Coordinates = __webpack_require__(6);

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

    if (!this.isValid()) {
      this.segments = [];
    }
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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Coordinates {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  equals(coord2) {
    return(this.i === coord2.i) && (this.j === coord2.j);
  }

  isOpposite(coord2) {
    return (this.i === (-1 * coord2.i)) && (this.j === (-1 * coord2.j));
  }

  plus(coord2) {
    return new Coordinates(this.i + coord2.i, this.j + coord2.j);
  }

}

module.exports = Coordinates;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map