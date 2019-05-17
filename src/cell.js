const MovingObject = require("./moving_object");
const math = require("mathjs");
const { randomVector, randomAngleAcc, randomWeightMatrix, calcDistance, magnitude, calcFriction, turnByAngle, distanceToCircleBoundary, vectorTo } = require("./util");

class Cell extends MovingObject {
    constructor(pos, board, color) {
        super({ pos, vel: randomVector(Cell.SPEED), acc: randomVector(Cell.MAX_ACCELERATION), angAcc: randomAngleAcc(Cell.MAX_TURN_DEGREE), radius: 20, color: color || Cell.COLOR, board, energy: Cell.INIT_ENERGY })
        // this.energy = energy;

        this.sensoryNum = 16
        this.senseArray = []
        this.weightMatrix1 = randomWeightMatrix([this.sensoryNum, 4]);
        this.weightMatrix2 = randomWeightMatrix([4, 2]);
        this.radius = Math.sqrt(this.energy) * 5;
    }

    getSenseDist(senseAng) {
        minDist = Cell.MAX_SENSE_DIST;
        const food = this.board.food;
        for (let i = 0; i < food.length; i++) {
            if (calcDistance(this.pos, food[i].pos) < Cell.MAX_SENSE_DIST) {
                let currDist = distanceToCircleBoundary(this.pos, food[i].pos, senseAng, food[i].radius);
                if (currDist && (currDist < minDist)) {
                    minDist = currDist;
                }
            }
        }
        return minDist;
    }

    getSenseArray() {
        this.senseArray = []
        for (let i = 0; i < this.sensoryNum; i++) {
            debugger;
            let senseAng = 2 * Math.PI * i / this.sensoryNum;
            this.senseArray.push(this.getSenseDist(senseAng));
        }
        debugger;
    }
    calculateAcc() {
        const accelerations = math.multiply(this.senseArray, this.weightMatrix1, this.weightMatrix2)
    }

    move() {
        this.getSenseArray();
        this.calculateAcc();
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

    calculateVel() {
        this.vel = [this.vel[0] + this.acc[0], this.vel[1] + this.acc[1]];
        friction = calcFriction(this.vel, this.radius, MovingObject.FRICTION_COEFFICIENT)
        if (magnitude(this.vel) > magnitude(friction)) {
            this.vel = [this.vel[0] + friction[0], this.vel[1] + friction[1]]
        } else {
            this.vel = [0, 0]
        }
    }

    draw(ctx) {
        this.radius = Math.sqrt(this.energy) * 5;

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

        for (let i = 0; i < this.sensoryNum; i++) {
            ctx.beginPath();
            ctx.moveTo(this.pos[0], this.pos[1]);
            let endPoint = vectorTo(this.pos, 2 * Math.PI * i / this.sensoryNum, this.senseArray[i])
            ctx.lineTo(endPoint[0], endPoint[1])
            ctx.fillText(this.senseArray[i], (this.pos[0] + endPoint[0]) / 2, (this.pos[1] + endPoint[1]) / 2)
            ctx.stroke();
        }

    }

    static get COLOR() {
        return "#a4837a";
    }

    static get SPEED() {
        return 0;
    }

    static get MAX_ACCELERATION() {
        return 1;
    }
    
    static get MAX_TURN_DEGREE() {
        return 0.05;
    }

    static get INIT_ENERGY() {
        return 10;
    }

    static get MAX_SENSE_DIST() {
        return 200;
    }

}

module.exports = Cell;