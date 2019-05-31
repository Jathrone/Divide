const Board = require("./board");

class BoardView {
    constructor(ctx, dimX, dimY, displayArea) {
        this.board = new Board(dimX, dimY);
        this.ctx = ctx;
        this.displayArea = displayArea;
    }

    start() {
        const animateCallback = () => {
            this.board.draw(this.ctx);
            this.board.step();
            this.displayArea.render();
            requestAnimationFrame(animateCallback);
        }

        animateCallback();
    }
}

module.exports = BoardView;