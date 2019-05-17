const MovingObject = require("./moving_object");

class Food extends MovingObject {
    constructor(pos, board) {
        super({pos, vel: Food.VEL, radius: Food.RADIUS, color: Food.COLOR, board, energy: Food.ENERGY})
    }

    static get VEL() {
        return [0,0];
    }

    static get RADIUS() {
        return 15;
    }

    static get COLOR() {
        return "#aec567";
    }

    static get ENERGY() {
        return 1;
    }
}

module.exports = Food;