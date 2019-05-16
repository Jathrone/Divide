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
    }
}

module.exports = Util;