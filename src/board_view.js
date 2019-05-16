const Board = require("./board");

class BoardView {
    constructor(ctx, dimX, dimY) {
        this.board = new Board(dimX, dimY);
        this.ctx = ctx;
    }

    start() {
        const animateCallback = () => {
            this.board.draw(this.ctx);
            this.board.step();
            requestAnimationFrame(animateCallback);
        }

        animateCallback();
    }
}

module.exports = BoardView;