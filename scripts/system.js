function isGameOver() {
  var black = 0;
  var white = 0;
  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (board[i][j] == 0 && !isPuttable(j, i, 1) && isPuttable(j, i, 2)) return false;
      if (board[i][j] == 1) black++;
      if (board[i][j] == 2) white++;
    }
  }

  showResult(black, white);

  return true;
}

function showResult(black, white) {
  document.getElementById("game_menu").innerHTML = "<div style='text-align:center'><div style='font-size:50px'>GameOver!</div> Black: "+ black + " White: " + white + "</div>";
}
