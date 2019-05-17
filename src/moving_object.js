const { calcDistance, calcFriction, magnitude, turnByAngle } = require("./util");

let frictionCoefficient;
let density;
document.addEventListener("DOMContentLoaded", () => {
    const frictionInput = document.getElementById("friction");
    const densityInput = document.getElementById("density");
    function updateFriction(value) {
        frictionCoefficient = value
    };

    function updateDensity(value) {
        density = value
    };

    frictionInput.addEventListener("change", (e) => {
        updateFriction(0.5 ** e.currentTarget.value);
    })
    densityInput.addEventListener("change", (e) => {
        updateDensity(e.currentTarget.value * 0.00001);
    })
})


class MovingObject {
    constructor({ pos, vel, acc, angAcc, radius, color, energy, board}) {
        this.pos = pos;
        this.vel = vel; 
        this.acc = acc;
        this.angAcc = angAcc;
        this.radius = radius;
        // this.radius = Math.sqrt(energy) * 5;
        this.color = color;
        this.board = board;
        this.energy = energy;
    }

    draw(ctx) {
        // this.radius = Math.sqrt(this.energy) * 5;

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
            this.board.remove(this);
        }
        else if (this.energy > 100) {
            this.board.divideCell(this);
        } else {
            this.energy -= MovingObject.DENSITY * (this.radius ** 2) * magnitude(this.acc);
            this.calculateVel();
            this.vel = turnByAngle(this.vel, this.angAcc);
            this.acc = turnByAngle(this.acc, this.angAcc);
            this.pos = this.board.wrap([this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]);
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
        return frictionCoefficient || 0.5 ** 10;
    }

    static get DENSITY() {
        return density || 0.0001;
    }
}

module.exports = MovingObject;