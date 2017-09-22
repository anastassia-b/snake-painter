const Board = require('./board');

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
    for (let i = 0; i <= 3; i++) {
      if (i === 0 ) {
        const $button = $("<button>").html('Paint');
        $button.on("click", this.paint);
        $levels.append($button);
      } else {
        const $button = $("<button>").html(`Level ${i}`);
        $button.on("click", this[`level${i}`]);
        $levels.append($button);
      }
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

  paint() {
    $("li").css("background-color", "#fff7f8");

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
    // this.$li.filter(`.${className}`).removeClass();

    coords.forEach( coord => {
      const flatCoord = (coord.i * this.board.dim) + coord.j;
      console.log("flatCoord", flatCoord);
      // this.$li.eq(flatCoord).addClass(className);
      this.$li.eq(flatCoord).css("background-color", randomColorString());
    });
  }

  step() {
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
