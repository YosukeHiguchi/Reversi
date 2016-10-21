var cursorX = -1, cursorY = -1;
var currentID = 1;
var N = 8;

document.onclick = main;

function main() {
  var x_grid = Math.floor(cursorX / 91);
  var y_grid = Math.floor(cursorY / 91)

  if (cursorX >= 0 && cursorY >= 0 && cursorX <= W && cursorY <= H &&
      board[y_grid][x_grid] == 0 && isPuttable(x_grid, y_grid, currentID)) {
    placeDisk(x_grid, y_grid);

    animateDisk(x_grid, y_grid);

    switchID();
  }

}

document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("main_display");

  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  if (cursorX >= 0 && cursorY >= 0 && cursorX <= W && cursorY <= H &&
      board[Math.floor(cursorY / 91)][Math.floor(cursorX / 91)] == 0) {
    hoverDisk(cursorX, cursorY);
  }
}

function switchID() {
  (currentID == 1)? currentID = 2: currentID = 1;
}
