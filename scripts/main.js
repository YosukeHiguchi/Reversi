var cursorX = -1, cursorY = -1;
var currentID = 1;
var N = 8;
var GAME_FINISHED = false;

document.onclick = main;
document.onmousemove = mouseMove;

function main() {
  if (GAME_FINISHED) return;
  var x_grid = Math.floor(cursorX / 91);
  var y_grid = Math.floor(cursorY / 91)

  if (cursorX >= 0 && cursorY >= 0 && cursorX <= W && cursorY <= H &&
      board[y_grid][x_grid] == 0 && isPuttable(x_grid, y_grid, currentID)) {
    placeDisk(x_grid, y_grid);
    switchID();
  }

}

function mouseMove(e) {
  if (GAME_FINISHED) return;
  
  var wrapperDiv = document.getElementById("main_display");

  //control when animation is playing
  if (frame == 0) {
    cursorX = e.clientX - wrapperDiv.offsetLeft;
    cursorY = e.clientY - wrapperDiv.offsetTop;
  }

  //no place to put
  var cnt = 0;
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (board[i][j] == 0 && isPuttable(j, i, currentID)) {
        cnt++;
      }
    }
  }
  if (cnt == 0 && frame == 0) switchID();
  console.log(cnt);

  if (cursorX >= 0 && cursorY >= 0 && cursorX <= W && cursorY <= H &&
      board[Math.floor(cursorY / 91)][Math.floor(cursorX / 91)] == 0) {
    hoverDisk(cursorX, cursorY);
  }
}

function switchID() {
  (currentID == 1)? currentID = 2: currentID = 1;
}
