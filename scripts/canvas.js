'use strict'
var ctx;

var W = 722;
var H = 722;

var animation_time;
var frame = 0;

function init() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");

    updateBoard();
  }
}

function placeDisk(x_grid, y_grid) {
  board[y_grid][x_grid] = currentID;
  animateDisk(x_grid, y_grid);
  updateBoard();

}

function hoverDisk(x_px, y_px) {
  updateBoard();
  drawDisk(Math.floor(x_px / 91), Math.floor(y_px / 91), currentID, 1);
}

function drawDisk(x_grid, y_grid, id, isHover) {
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
    if (id == 2) ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  }
  else ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.arc(x_px, y_px, 41, 0, 2 * Math.PI, false);
  ctx.fill();

}

//find where to flip when disk(currentID) is place at (x, y) and start flip animation
function animateDisk(x, y) {
  setDiskToFlip(x, y, currentID);

  //reset board at (i, j) where disk is already placed
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (diskToFlip[i][j] == 1) board[i][j] = 0;
    }
  }

  animation_time = setInterval(animate, 50);
}


function animate() {
  var opID = (currentID == 1)? 2: 1;

  frame += 3;

  if (frame == 36) {
    for (var i = 0; i < N ; i++) {
      for (var j = 0; j < N; j++) {
        if (diskToFlip[i][j] == 1) {
          board[i][j] = opID;
        }
      }
    }

    frame = 0;
    clearInterval(animation_time);

    GAME_FINISHED = isGameOver();

    return;
  }

  updateBoard();

  for (var i = 0; i < N ; i++) {
    for (var j = 0; j < N; j++) {
      if (diskToFlip[i][j] == 1) {
        flipDisk(90 * j + 46, 90 * i + 46, currentID);
      }
    }
  }
}

function flipDisk(x, y, id){
  var grad;
  if (id == 1) {
    if (frame <= 21) {
      grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 41);
      grad.addColorStop(0, "#3C3939");
    }
    else {
      grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 110);
      grad.addColorStop(0, "#FFFFFF");
    }
  }
  if (id == 2){
    if (frame <= 21){
      grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 110);
      grad.addColorStop(0, "#FFFFFF");
    }
    else {
      grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 41);
      grad.addColorStop(0, "#3C3939");
    }
  }
  grad.addColorStop(1, "#000000");

  ctx.fillStyle = grad;

  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.scale(Math.sin(frame / 180 * 8 * Math.PI), 1);
  ctx.arc(0, 0, 41, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
}
