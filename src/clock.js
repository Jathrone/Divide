class Clock {
    constructor() {
        this.time = 0;
    }

    tick() {
        this.time += 0.03;
    }
}
const clock = new Clock();

module.exports = clock;