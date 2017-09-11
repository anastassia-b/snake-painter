// const Board = require('./board');

window.randomColorString = function() {
  return '#' + Math.random().toString(16).substr(-6);
}

class View {
  constructor($el) {
    this.$el = $el;
    this.setupBoard();
    this.level0();
  }

  setupBoard() {
    //make buttons for levels
    for (let i = 0; i <= 5; i++) {
      const $button = $("<button>").html(`Level ${i}`);
      $button.on("click", this[`level${i}`]);
      this.$el.append($button);
    }

    for (let i = 0; i < 30; i++) {
      this.addRow();
    }

  }

  addRow() {
    const rowIdx = this.$el.find(".row").length;
    const $row = $("<ul>").addClass("row").addClass("group");
    for (let colIdx = 0; colIdx < 30; colIdx++) {
      const $square = $("<li>").addClass("square").attr("data-pos", [rowIdx, colIdx]);

      $row.append($square);
    }
    this.$el.append($row);
  }

  level0() {
    console.log("something");
    $('.square').on("mouseover", e => {
      const $sq = $(e.currentTarget);
      $sq.css("background-color",  randomColorString());
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

}

View.STEP_MILLIS = 100;

module.exports = View;
