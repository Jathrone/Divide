const { calcDistance } = require("./util");

class MovingObject {
    constructor({ pos, vel, radius, color, energy, board}) {
        this.pos = pos;
        this.vel = vel; 
        this.radius = radius;
        this.color = color;
        this.board = board;
        this.energy = energy;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();

        ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            0,
            2 * Math.PI,
            false
        );

        ctx.fill();
        
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.energy, this.pos[0], this.pos[1])
    }

    move() {
        this.pos = this.board.wrap([this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]])
    }

    isConsuming(otherObject) {
        return (calcDistance(this.pos, otherObject.pos) <= this.radius)
    }

    consume(otherObject) {
        this.board.remove(otherObject);
        this.energy += otherObject.energy;
    }
}

module.exports = MovingObject;