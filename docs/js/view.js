const Board = require('./board');

const randomColorString = function() {
  return '#' + Math.random().toString(16).substr(-4) + '00';
};

class View {
  constructor($el) {
    this.$el = $el;
    const size = 25;
    this.setupBoard(size);

    this.board = new Board(size);

    this.intervalId = window.setInterval(
      this.step.bind(this), View.STEP_MILLIS
    );

    this.$li = this.$el.find("li");

    $(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  setupBoard(size) {
    this.addButtons();

    const $board = $("<figure>").addClass("board");

    for (let i = 0; i < size; i++) {
      this.addRow($board, size);
    }

    this.$el.append($board);
  }

  addButtons() {
    const $levels = $("<nav>").addClass("levels");
    for (let i = 0; i <= 1; i++) {
      if (i === 0 ) {
        const $button = $("<button>").html('Paint');
        $button.on("click", this.paint);
        $levels.append($button);
      } else {
        const $button = $("<button>").html(`Play`);
        $button.on("click", () => window.location.reload(false));
        $levels.append($button);
      }
    }
    this.$el.append($levels);
  }

  addRow($board, size) {
    const rowIdx = this.$el.find(".row").length;
    const $row = $("<ul>").addClass("row").addClass("group");
    for (let colIdx = 0; colIdx < size; colIdx++) {
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
      // console.log("flatCoord", flatCoord);
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
