const Board = require("./board");
const clock = require("./clock");

class BoardView {
    constructor(ctx, dimX, dimY, displayArea, phylogeneticTree) {
        this.board = new Board(dimX, dimY, phylogeneticTree, displayArea);
        this.ctx = ctx;
        this.displayArea = displayArea;
        this.phylogeneticTree = phylogeneticTree
    }

    start() {

        // let frameCount = 0;
        let then = Date.now();
        let elapsed;
        const animateCallback = () => {
            requestAnimationFrame(animateCallback);

            now = Date.now();
            elapsed = now - then;
            if (elapsed > 30) {
                then = now;
                if (this.displayArea.paused) {
                    this.displayArea.render();
                } else {
                    clock.tick();
                    this.board.draw(this.ctx);
                    this.board.step();
                    this.displayArea.render();
                }
            }
        }

        animateCallback();
    }
}

module.exports = BoardView;