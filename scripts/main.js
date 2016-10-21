var cursorX = -1, cursorY = -1;
var currentID = 1;
var N = 8;

document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("main_display");

  cursorX = e.clientX - wrapperDiv.offsetLeft;
  cursorY = e.clientY - wrapperDiv.offsetTop;

  if (cursorX >= 0 && cursorY >= 0 && cursorX <= W && cursorY <= H) {
    hoverDisk(cursorX, cursorY);
  }
}
