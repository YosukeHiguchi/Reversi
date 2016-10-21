var board = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

var diskToFlip;

function updateBoard() {
  ctx.clearRect(0, 0, W, H);

  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (board[i][j] != 0) drawDisk(j, i, board[i][j], 0);
    }
  }
}

//returns if (x, y) is puttable for ID
function isPuttable(x, y, ID) {
  var opID = (ID == 1)? 2: 1;
  var xDir = [1, 0, 1, 1];
  var yDir = [0, 1, 1, -1];
  var side1Cont, side2Cont;
  var side1Grid, side2Grid;

  for (var d = 0; d < 4; d++) {
    side1Cont = side2Cont = true;

    for (var v = 1; v < N; v++) {
      side1Grid = side2Grid = -1;
      if (x - v * xDir[d] >= 0 && y - v * yDir[d] >= 0 && y - v * yDir[d] < N)
        side1Grid = board[y - v * yDir[d]][x - v * xDir[d]];
      if (x + v * xDir[d] >= 0 && y + v * yDir[d] >= 0 && y + v * yDir[d] < N)
        side2Grid = board[y + v * yDir[d]][x + v * xDir[d]];

      if ((v == 1 && side1Grid != opID) || side1Grid == 0) side1Cont = false;
      if ((v == 1 && side2Grid != opID) || side2Grid == 0) side2Cont = false;

      if (v >= 2 && side1Cont && side1Grid == ID) return true;
      if (v >= 2 && side2Cont && side2Grid == ID) return true;

      if (!side1Cont && !side2Cont) break;
    }
  }

  return false;
}
