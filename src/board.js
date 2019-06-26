const Cell = require('./cell');
const Food = require('./food');
const { randomColor, randomNearbyColor } = require("./util");

class Board {
    constructor(dimX, dimY, phylogeneticTree) {
        this.dimX = dimX;
        this.dimY = dimY;
        this.phylogeneticTree = phylogeneticTree;
        this.cells = [];
        this.food = [];
        this.addCells();
        this.addInitFood();
    }

    addCells() {
        for (let i=0; i < Board.NUM_INIT_CELLS; i++) {
            this.cells.push(new Cell(this.randomPosition(), this, randomColor()))
        }
        for (let i in this.cells) {
            this.phylogeneticTree.addCell(this.cells[i], this.cells[i])
        }
    }

    addCell(pos, color, sNum, wM1, wM2) {
        const newColor = randomNearbyColor(color);
        const cell1 = new Cell([pos[0] + 100, pos[1] - 100], this, newColor, sNum, wM1, wM2);
        const cell2 = new Cell([pos[0] - 100, pos[1] + 100], this, newColor, sNum, wM1, wM2); 
        this.cells.push(cell1);
        this.cells.push(cell2);
        return {cell1, cell2};
    }

    divideCell(cell) {
        const {cell1, cell2} = this.addCell(cell.pos, cell.color, cell.sensoryNum, cell.weightMatrix1, cell.weightMatrix2);
        this.phylogeneticTree.addCell(cell, cell1);
        this.phylogeneticTree.addCell(cell, cell2);
        this.remove(cell);
    }

    addInitFood() {
        for (let i=0; i < Board.NUM_INIT_FOOD; i++) {
            this.food.push(new Food(this.randomPosition(), this))
        }
    }

    addStepFood() {
        for (let i=0; i < Board.NUM_STEP_FOOD; i++) {
            if (Math.random() < 0.1) {
                this.food.push(new Food(this.randomPosition(), this))
            }
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

            for (let k=i+1; k < this.cells.length; k++) {
                if (this.cells[i].isConsuming(this.cells[k])) {
                    this.cells[i].consume(this.cells[k])
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
        return 3;
    }

    static get NUM_INIT_FOOD() {
        return 1000;
    }

    static get NUM_STEP_FOOD() {
        return 2;
    }
}

module.exports = Board;