function test(ID) {
  var xy = Array(2);

  var x = [];
  var y = [];

  for (var i = 0; i < N; i++) {
    for (var j = 0; j < N; j++) {
      if (isPuttable(j, i, ID)) {
        x.push(j);
        y.push(i);
      }
    }
  }

  if (x.length <= 0) {
    x[0] = -1;
    y[0] = -1;
  }

  var n = Math.floor(Math.random() * x.length);

  xy[0] = x[n];
  xy[1] = y[n];

  return xy;
}
