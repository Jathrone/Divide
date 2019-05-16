const { calcDistance, calcFriction, magnitude } = require("./util");

class MovingObject {
    constructor({ pos, vel, acc, radius, color, energy, board}) {
        this.pos = pos;
        this.vel = vel; 
        this.acc = acc;
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
        if (this.energy < 0) {
            return false
        } else {
            this.energy -= MovingObject.DENSITY * (this.radius ** 2) * this.acc;
            this.calculateVel();
            this.pos = this.board.wrap([this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]])
            return true
        }
    }

    isConsuming(otherObject) {
        return (calcDistance(this.pos, otherObject.pos) <= this.radius)
    }

    consume(otherObject) {
        this.board.remove(otherObject);
        this.energy += otherObject.energy;
    }


    calculateVel() {
        this.vel = [this.vel[0] + this.acc[0], this.vel[1] + this.acc[1]];
        friction = calcFriction(this.vel, this.radius, MovingObject.FRICTION_COEFFICIENT)
        if (magnitude(this.vel) > magnitude(friction)) {
            this.vel = [this.vel[0] + friction[0], this.vel[1] + friction[1]]
        } else {
            this.vel = [0,0]
        }
    }

    static get FRICTION_COEFFICIENT() {
        return 0.00001;
    }

    static get DENSITY() {
        return 0.001;
    }
}

module.exports = MovingObject;