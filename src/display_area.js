class DisplayArea {
    constructor(displayAreaEl) {
        this.displayAreaEl = displayAreaEl;
        this.cellNum = null;
        this.displayCell = null;

        console.log({elementX: displayAreaEl.offsetTop, elementY: displayAreaEl.offsetLeft})
        this.draggable = false;
        this.mouseDownX = 0;
        this.mouseDownY = 0;
        this.currMouseX = 0;
        this.currMouseY = 0;
        this.displayAreaEl.addEventListener("mousedown", this.handleMouseDown.bind(this));

        this.displayAreaEl.addEventListener("mouseup", this.handleMouseUp.bind(this));

        this.displayAreaEl.addEventListener("mouseleave", this.handleMouseUp.bind(this))

        this.displayAreaEl.addEventListener("mousemove", this.handleDrag.bind(this))
    }

    handleMouseDown(e) {
        this.elementX = this.displayAreaEl.offsetLeft;
        this.elementY = this.displayAreaEl.offsetTop;
        this.draggable = true;
        console.log({ mouseDownX: e.clientX, mouseDownY: e.clientY })
        this.mouseDownX = e.clientX;
        this.mouseDownY = e.clientY;
    }

    handleMouseUp() {
        this.draggable = false;
    }

    handleDrag(e) {
        if (this.draggable) {
            this.currMouseX = e.clientX;
            this.currMouseY = e.clientY;
            
            this.displayAreaEl.style.left = (this.elementX - this.mouseDownX + this.currMouseX) + "px";
            this.displayAreaEl.style.top = (this.elementY - this.mouseDownY + this.currMouseY) + "px";
        }
    }

    render() {
        // const displayCell = document.getElementById("display-cell");
        this.displayAreaEl.innerHTML = this.displayCell ? `cell number ${this.cellNum}; ${this.displayCell.senseArray}`: "placeholder";
    }
}

module.exports = DisplayArea;