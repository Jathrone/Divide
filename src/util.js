const math = require("mathjs");

const Util = {
    randomVector(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },

    scale(vec, m) {
        return [vec[0] * m, vec[1] * m]
    },

    calcDistance(pos1, pos2) {
        return Math.sqrt((pos1[0] - pos2[0]) ** 2 + (pos1[1] - pos2[1]) ** 2)
    },

    calcFriction (vel, radius, coeff) {
        const magnitude = Util.magnitude(vel);
        return [-(vel[0] * (magnitude ** 2) * radius * coeff), -(vel[1] * (magnitude ** 2) * radius * coeff)];
    },

    magnitude(vel) {
        return Util.calcDistance([0,0], vel)
    },

    randomAngleAcc(max) {
        return 2 * max * Math.random()- max;

    },

    turnByAngle(vel, angAcc) {
        let currAng = Math.atan(vel[1] / vel[0]);
        if (vel[0] < 0 ) {
            currAng += Math.PI ;
        }
        const newVel = [Math.cos(currAng + angAcc) * Util.magnitude(vel), Math.sin(currAng + angAcc) * Util.magnitude(vel)]
        return newVel;
    },

    randomWeightMatrix(size) {
        return math.matrix(math.random(size)).map(function(val) {return val * 2 - 1});
    },

    distanceToCircleBoundary(posFrom, posObj, senseAng, radiusObj) {
        let totalAng;
        totalAng = Math.atan((posObj[1] - posFrom[1])/(posObj[0] - posFrom[0]));
        if ((posObj[0] - posFrom[0]) < 0) {
            totalAng += Math.PI;
        }
        if (totalAng < 0) {
            totalAng += 2 * Math.PI;
        }
        const dist = Util.calcDistance(posFrom, posObj);
        const angDiff = Math.abs(totalAng - senseAng);
        if ((angDiff < Math.PI / 2) && ((dist * Math.sin(angDiff)) < radiusObj)) {
            return (dist * Math.cos(angDiff) - Math.sqrt(radiusObj ** 2 - (Math.sin(angDiff) ** 2)));
        } else {
            return false;
        }
    },

    vectorTo(startPos, angle, dist) {
        return [startPos[0] + dist * Math.cos(angle), startPos[1] + dist * Math.sin(angle)]
    },

    sigmoid(t) {
        return 1/(1 + Math.exp(-t));
    }
}

module.exports = Util;