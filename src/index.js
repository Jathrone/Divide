const BoardView = require("./board_view");

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
})