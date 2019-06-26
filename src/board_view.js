const Board = require("./board");

class BoardView {
    constructor(ctx, dimX, dimY, displayArea, phylogeneticTree) {
        this.board = new Board(dimX, dimY, phylogeneticTree);
        this.ctx = ctx;
        this.displayArea = displayArea;
        this.phylogeneticTree = phylogeneticTree
    }

    start() {
        const animateCallback = () => {
            if (this.displayArea.paused) {
                this.displayArea.render();
                requestAnimationFrame(animateCallback);
            } else {
                this.board.draw(this.ctx);
                this.board.step();
                this.displayArea.render();
                requestAnimationFrame(animateCallback);
            }
        }

        animateCallback();
    }
}

module.exports = BoardView;