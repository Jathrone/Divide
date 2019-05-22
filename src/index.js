const BoardView = require("./board_view");
const { calcDistance } = require("./util");

console.log("webpack is working!");

document.addEventListener("DOMContentLoaded", () => {
    console.log("we are ready to add stuff to canvas")

    const canvasEl = document.getElementById("game-canvas");
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;

    const ctx = canvasEl.getContext("2d");
    window.ctx = ctx;
    
    const boardView = new BoardView(ctx, canvasEl.width, canvasEl.height);
    boardView.start();


    canvasEl.addEventListener("click", (e) => {
        const pos = {
            x: e.clientX,
            y: e.clientY
        }

        boardView.board.cells.forEach((cell) => {
            if (calcDistance([pos.x, pos.y], cell.pos) < cell.radius + 10) {
                alert(`cell number ${boardView.board.cells.indexOf(cell)}`)
            }
        })
    })

    canvasEl.addEventListener("mousemove", (e) => {
        const pos = {
            x: e.clientX,
            y: e.clientY
        }
        let setCursor = false;
        boardView.board.cells.forEach((cell) => {
            if (calcDistance([pos.x, pos.y], cell.pos) < cell.radius + 10) {
                setCursor = true;
            }
        })
        
        if (setCursor) {
            canvasEl.style.cursor = "pointer";
        } else {
            canvasEl.style.cursor = "default";
        }
    })
})