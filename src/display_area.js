class DisplayArea {
    constructor(displayAreaEl) {
        this.displayAreaEl = displayAreaEl;
        this.cellNum = null;
        this.displayCell = null;
        this.currentDisplay = "population";
        this.paused = true;

        this.draggable = false;
        this.displayAreaEl.addEventListener("mousedown", this.handleMouseDown.bind(this));
        this.displayAreaEl.addEventListener("mouseup", this.handleMouseUp.bind(this));
        this.displayAreaEl.addEventListener("mouseleave", this.handleMouseUp.bind(this))
        this.displayAreaEl.addEventListener("mousemove", this.handleDrag.bind(this))


        this.controlAreaEl = this.displayAreaEl.querySelector("#controls");
        this.instructionsEl = this.displayAreaEl.querySelector("#instructions");

        const slidersDiv = this.controlAreaEl.querySelector("#toggles");
        slidersDiv.addEventListener("mousedown", (e) => {
            e.stopPropagation();
        })

        this.handleSelectButton = this.handleSelectButton.bind(this);
        Array.from(this.controlAreaEl.querySelectorAll("button")).forEach((buttonEl) => {
            buttonEl.addEventListener("click", () => {
                this.handleSelectButton(buttonEl);
            })
        })

        this.controlAreaEl.querySelector("#toggles #pause-button").addEventListener("click", this.handleTogglePaused.bind(this));

        this.instructionsEl.querySelector("#start-button").addEventListener("click", this.handleStart.bind(this));
    }
    
    handleStart(e) {
        e.preventDefault();
        this.paused = false;
        this.displayAreaEl.className = "minimized";
    }
    handleTogglePaused(e) {
        e.preventDefault();
        this.paused = !this.paused;
        this.controlAreaEl.querySelector("#toggles #pause-button").innerHTML = this.paused ? "resume" : "pause";
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
        if (this.displayAreaEl.className === "maximized") {
            this.controlAreaEl.style.display = "none";
            this.instructionsEl.style.display = "flex";
        } else if (this.displayAreaEl.className === "minimized") {
            this.controlAreaEl.style.display = "inherit";
            this.instructionsEl.style.display = "none";

            if (this.currentDisplay === "toggles") {
                this.controlAreaEl.querySelector("#individual").style.display = "none";
                this.controlAreaEl.querySelector("#population").style.display = "none";
                this.controlAreaEl.querySelector("#toggles").style.display = "inherit";
                this.controlAreaEl.querySelector("#toggles #pause-button").innerHTML = this.paused ? "resume" : "pause";
            } else if (this.currentDisplay === "individual") {
                this.controlAreaEl.querySelector("#individual").style.display = "inherit";
                this.controlAreaEl.querySelector("#population").style.display = "none";
                this.controlAreaEl.querySelector("#toggles").style.display = "none";
    
                if (this.displayCell) {
                    const c = document.getElementById("game-canvas");
                    const ctx = c.getContext("2d");
                    const cellImage = ctx.getImageData(this.displayCell.pos[0] - 100, this.displayCell.pos[1] - 100, 200, 200);
                    const cp = document.getElementById("cell-canvas");
                    const ctxp = cp.getContext("2d");
                    ctxp.putImageData(cellImage, 0, 0);
    
                }
                // this.displayAreaEl.querySelector("#individual").innerHTML = this.displayCell ? `cell number ${this.cellNum}; ${this.displayCell.senseArray}`: null;
            } else if (this.currentDisplay === "population") {
                this.controlAreaEl.querySelector("#individual").style.display = "none";
                this.controlAreaEl.querySelector("#population").style.display = "flex";
                this.controlAreaEl.querySelector("#toggles").style.display = "none";
            }
        }
    }
}

module.exports = DisplayArea;