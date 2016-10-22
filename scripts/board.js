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

//put 1 for disks to flip when disk is placed at (x, y)
function setDiskToFlip(x, y, ID) {
  diskToFlip = Array(N);
  for (var i = 0; i < N; i++) {
    diskToFlip[i] = new Array(N);
    for (var j = 0; j < N; j++) diskToFlip[i][j] = 0;
  }

  var opID = (ID == 1)? 2: 1;
  var xDir = [1, 0, 1, 1];
  var yDir = [0, 1, 1, -1];
  var side1Cont, side2Cont;
  var side1Grid, side2Grid;

  for (var d = 0; d < 4; d++) {
    side1Cont = side2Cont = true;

    //side1
    for (var v = 1; v <= N; v++) {
      side1Grid = -1;
      if (x - v * xDir[d] >= 0 && y - v * yDir[d] >= 0 && y - v * yDir[d] < N)
        side1Grid = board[y - v * yDir[d]][x - v * xDir[d]];

      if ((v == 1 && side1Grid != opID) || side1Grid <= 0) { side1Cont = false; break; }
      if (v >= 2 && side1Grid == ID) break;
    }
    //side2
    for (var v = 1; v <= N; v++) {
      side2Grid = -1;
      if ((x + v * xDir[d] < N) && (y + v * yDir[d] < N) && (y + v * yDir[d] >= 0))
        side2Grid = board[y + v * yDir[d]][x + v * xDir[d]];

      if ((v == 1 && side2Grid != opID) || side2Grid <= 0) { side2Cont = false; break; }
      if (v >= 2 && side2Grid == ID) break;
    }

    //side1
    for (var v = 1; v < N && side1Cont; v++) {
      side1Grid = board[y - v * yDir[d]][x - v * xDir[d]];
      if (side1Grid == ID) break;
      else diskToFlip[y - v * yDir[d]][x - v * xDir[d]] = 1;
    }
    //side2
    for (var v = 1; v < N && side2Cont; v++) {
      side2Grid = board[y + v * yDir[d]][x + v * xDir[d]];
      if (side2Grid == ID) break;
      else diskToFlip[y + v * yDir[d]][x + v * xDir[d]] = 1;
    }
  }
}
