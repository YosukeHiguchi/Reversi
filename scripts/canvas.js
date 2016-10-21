'use strict'
var ctx;

var W = 722;
var H = 722;

function init() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
  }
}

function hoverDisk(x_px, y_px) {
  updateBoard();
  placeDisk(Math.floor(x_px / 91), Math.floor(y_px / 91), currentID, 1);
}

function placeDisk(x_grid, y_grid, id, isHover) {
  var grad;

  var x_px = 90 * x_grid + 46;
  var y_px = 90 * y_grid + 46;

  if (id == 1) {
    grad = ctx.createRadialGradient(x_px, y_px, 0, x_px, y_px, 41);
    grad.addColorStop(0, "#3C3939");
  }
  if (id == 2){
    grad = ctx.createRadialGradient(x_px, y_px, 0, x_px, y_px, 110);
    grad.addColorStop(0, "#FFFFFF");
  }

  grad.addColorStop(1, "#000000");

  if (isHover == 1) {
    if (id == 1) ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    if (id == 2) ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  }
  else ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.arc(x_px, y_px, 41, 0, 2 * Math.PI, false);
  ctx.fill();
}
