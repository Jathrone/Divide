class DisplayArea {
    constructor(displayAreaEl) {
        this.displayAreaEl = displayAreaEl;
        this.cellNum = null;
        this.displayCell = null;
        this.currentDisplay = "toggles";

        this.draggable = false;
        this.displayAreaEl.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.displayAreaEl.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.displayAreaEl.addEventListener("mouseleave", this.handleMouseUp.bind(this))
        this.displayAreaEl.addEventListener("mousemove", this.handleDrag.bind(this))


        const slidersDiv = this.displayAreaEl.querySelector("#toggles");
        slidersDiv.addEventListener("mousedown", (e) => {
            e.stopPropagation();
        })

        this.handleSelectButton = this.handleSelectButton.bind(this);
        Array.from(this.displayAreaEl.querySelectorAll("button")).forEach((buttonEl) => {
            buttonEl.addEventListener("click", () => {
                this.handleSelectButton(buttonEl);
            })
        })
    }

    handleSelectButton(buttonEl) {
        this.currentDisplay = buttonEl.innerText;
    }

    handleMouseDown(e) {
        this.elementX = this.displayAreaEl.offsetLeft;
        this.elementY = this.displayAreaEl.offsetTop;
        this.draggable = true;
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
        if (this.currentDisplay === "toggles") {
            this.displayAreaEl.querySelector("#individual").style.display = "none";
            this.displayAreaEl.querySelector("#population").style.display = "none";
            this.displayAreaEl.querySelector("#toggles").style.display = "inherit";
        } else if (this.currentDisplay === "individual") {
            this.displayAreaEl.querySelector("#individual").style.display = "inherit";
            this.displayAreaEl.querySelector("#population").style.display = "none";
            this.displayAreaEl.querySelector("#toggles").style.display = "none";
            this.displayAreaEl.querySelector("#individual").innerHTML = this.displayCell ? `cell number ${this.cellNum}; ${this.displayCell.senseArray}`: "placeholder";
        }
    }
}

module.exports = DisplayArea;