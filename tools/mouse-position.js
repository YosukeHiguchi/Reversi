var SHOW_MOUSE_POS = 0;

document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("main_display");

  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  if (SHOW_MOUSE_POS == 1) {
    console.log("X: " + cursorX + " " + "Y: " + cursorY);
  }
}
