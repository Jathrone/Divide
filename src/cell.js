const MovingObject = require("./moving_object");
const { randomVector } = require("./util");

class Cell extends MovingObject {
    constructor(pos, board, color) {
        super({ pos, vel: randomVector(Cell.SPEED), acc: randomVector(Cell.ACCELERATION), radius: 20, color: color || Cell.COLOR, board, energy: Cell.INIT_ENERGY })
        // this.energy = energy;
    }

    static get COLOR() {
        return "#a4837a";
    }

    static get SPEED() {
        return 1;
    }

    static get ACCELERATION() {
        return 1;
    }
    

    static get INIT_ENERGY() {
        return 10;
    }


}

module.exports = Cell;