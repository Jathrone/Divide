class DisplayArea {
    constructor(displayAreaEl) {
        this.displayAreaEl = displayAreaEl;
        this.cellNum = null;
        this.displayCell = null;
    }

    render() {
        // const displayCell = document.getElementById("display-cell");
        this.displayAreaEl.innerHTML = this.displayCell ? `cell number ${this.cellNum}; ${this.displayCell.senseArray}`: "placeholder";
    }
}

module.exports = DisplayArea;