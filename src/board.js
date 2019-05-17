const Cell = require('./cell');
const Food = require('./food');

class Board {
    constructor(dimX, dimY) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.cells = [];
        this.food = [];
        this.addCells();
        this.addInitFood();
    }

    addCells() {
        for (let i=0; i <= Board.NUM_INIT_CELLS; i++) {
            this.cells.push(new Cell(this.randomPosition(), this))
        }
    }

    addCell(pos) {
        debugger;
        this.cells.push(new Cell(pos, this, "#d584de"));
    }

    divideCell(cell) {
        debugger
        this.addCell(cell.pos);
        this.addCell(cell.pos);
        this.remove(cell);
    }

    addInitFood() {
        for (let i=0; i <= Board.NUM_INIT_FOOD; i++) {
            this.food.push(new Food(this.randomPosition(), this))
        }
    }

    addStepFood() {
        for (let i=0; i <= Board.NUM_STEP_FOOD; i++) {
            this.food.push(new Food(this.randomPosition(), this))
        }
    }

    randomPosition() {
        return [Math.random() * this.dimX, Math.random() * this.dimY]
    }

    draw(ctx) {
        ctx.clearRect(0,0,this.dimX, this.dimY)

        this.food.forEach((foodEle) => {
            foodEle.draw(ctx);
        })

        this.cells.forEach((cell) => {
            cell.draw(ctx);
        })
    }

    moveObjects() {
        this.cells.forEach( (cell) => {
            cell.move();
        })
    }

    wrap(pos) {
        let posX = (pos[0] < 0) ? pos[0] + this.dimX : pos[0] % this.dimX;
        let posY = (pos[1] < 0) ? pos[1] + this.dimY : pos[1] % this.dimY;
        return [posX, posY]
    }

    checkConsumptions() {
        for (let i=0; i < this.cells.length; i++) {
            for (let j=0; j < this.food.length; j++) {
                if (this.cells[i].isConsuming(this.food[j])) {
                    this.cells[i].consume(this.food[j])
                }
            }
        }
    }

    step() {
        this.moveObjects();
        this.checkConsumptions();
        this.addStepFood();
    }

    remove(item) {
        this.food = this.food.filter((foodEle) => {
            return (foodEle !== item)
        })

        this.cells = this.cells.filter((cell) => {
            return (cell !== item)
        })
    }

    static get NUM_INIT_CELLS() {
        return 20;
    }

    static get NUM_INIT_FOOD() {
        return 20;
    }

    static get NUM_STEP_FOOD() {
        return 1;
    }
}

module.exports = Board;