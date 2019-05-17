const MovingObject = require("./moving_object");
const math = require("mathjs");
const { randomVector, randomAngleAcc, randomWeightMatrix, calcDistance, magnitude, calcFriction, turnByAngle, distanceToCircleBoundary, vectorTo, sigmoid } = require("./util");

class Cell extends MovingObject {
    constructor(pos, board, color, sensoryNum, weightMatrix1, weightMatrix2) {
        super({ pos, vel: [0,0], acc: [0,0], angAcc: 0, radius: 20, color: color || Cell.COLOR, board, energy: Cell.INIT_ENERGY })
        this.sensoryNum = 8
        this.senseArray = []
        this.memoryArray = math.zeros(this.sensoryNum * 3)._data;
        this.direction = 2 * Math.PI * Math.random();
        this.acc = vectorTo([0,0], this.direction, Cell.MAX_ACCELERATION);
        let randomWeightMatrix1 = randomWeightMatrix([this.memoryArray.length, 30]);
        let randomWeightMatrix2 = randomWeightMatrix([30, 2]);
        this.weightMatrix1 = weightMatrix1 ? math.add(math.multiply(weightMatrix1, 0.95), math.multiply(randomWeightMatrix1, 0.05)) : randomWeightMatrix1;
        this.weightMatrix2 = weightMatrix2 ? math.add(math.multiply(weightMatrix2, 0.95), math.multiply(randomWeightMatrix2, 0.05)) : randomWeightMatrix2;
        this.radius = Math.sqrt(this.energy) * 2;
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
            let senseAng = (2 * Math.PI * i / this.sensoryNum + this.direction) % (2 * Math.PI);
            this.senseArray.push(1 - this.getSenseDist(senseAng)/Cell.MAX_SENSE_DIST);
        }
        this.storeMemory();
    }

    storeMemory() {
        this.memoryArray = this.memoryArray.slice(0, 2*this.sensoryNum);
        this.memoryArray = this.senseArray.concat(this.memoryArray);
    }
    calculateAcc() {
        this.getSenseArray();
        let layerH;
        layerH = math.multiply(this.memoryArray, this.weightMatrix1);
        layerH = layerH.map(function (value, index, matrix) {
            return sigmoid(value);
        })
        let layerO;
        layerO = math.multiply(layerH, this.weightMatrix2);
        layerO = layerO.map(function (value, index, matrix) {
            return sigmoid(value);
        })
        layerO = layerO._data;
        this.acc = vectorTo([0, 0], this.direction, (2 * layerO[0] - 1) * Cell.MAX_ACCELERATION);
        this.angAcc = (2 * layerO[1] - 1) * Cell.MAX_TURN_DEGREE;
    }

    move() {
        this.calculateAcc();
        if (this.energy < 0) {
            this.board.remove(this);
        }
        else if (this.energy > 20) {
            this.board.divideCell(this);
        } else {
            this.energy -= MovingObject.DENSITY * (this.radius ** 2) * magnitude(this.acc);
            this.energy -= 0.01
            this.direction += this.angAcc;
            this.acc = turnByAngle(this.acc, this.angAcc);
            this.calculateVel();
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
        this.radius = Math.sqrt(this.energy) * 2;

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

        senseArrayTrueDist = math.multiply(math.matrix(this.senseArray), Cell.MAX_SENSE_DIST)._data;

        for (let i = 0; i < this.sensoryNum; i++) {
            let senseAng = (2 * Math.PI * i / this.sensoryNum + this.direction) % (2 * Math.PI);
            ctx.beginPath();
            ctx.moveTo(this.pos[0], this.pos[1]);
            let endPoint = vectorTo(this.pos, senseAng, Cell.MAX_SENSE_DIST - senseArrayTrueDist[i])
            ctx.lineTo(endPoint[0], endPoint[1])
            // ctx.fillText(200 - senseArrayTrueDist[i], (this.pos[0] + endPoint[0]) / 2, (this.pos[1] + endPoint[1]) / 2)
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
        return 80;
    }

}

module.exports = Cell;