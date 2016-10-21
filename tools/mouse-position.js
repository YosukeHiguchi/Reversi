var SHOW_MOUSE_POS = 1;

document.onmousemove = function (e) {
  var wrapperDiv = document.getElementById("main_display");
  if (SHOW_MOUSE_POS == 1) {
    console.log("X: " + (e.clientX - wrapperDiv.offsetLeft) + " " +
                "Y: " + (e.clientY - wrapperDiv.offsetTop));
  }
}
