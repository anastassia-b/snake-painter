const Board = require('./board');

const randomColorString = function() {
  return '#' + Math.random().toString(16).substr(-4) + '00';
};

class View {
  constructor($el) {
    this.$el = $el;
    this.setupBoard();
    this.level0();

    this.board = new Board(30);
    console.log(this.board);
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

  render() {

  }

  handleKeyEvent(event) {

  }


  step() {

  }

}


View.KEYS = {

};

View.STEP_MILLIS = 100;

module.exports = View;
