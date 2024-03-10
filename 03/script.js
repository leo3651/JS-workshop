const btn = document.querySelector(".cant-touch-this");
const OFFSET = 100;

btn.addEventListener("click", function (e) {
  alert("Nice try! Goodbye!");
  window.close();
});

document.addEventListener("mousemove", function (e) {
  const x = e.pageX;
  const y = e.pageY;
  console.log("--- NEW ---");
  console.log("Mouse x: ", x, "Mouse y: ", y);

  const btnBox = btn.getBoundingClientRect();
  console.log(
    "btnBox x: ",
    btnBox.x,
    "btnBox y: ",
    btnBox.y,
    "width: ",
    btnBox.width,
    "height: ",
    btnBox.height
  );

  const horizontalDistance = distaceFromCenter(x, btnBox.x, btnBox.width);
  console.log("Horizontal distance: ", horizontalDistance);

  const verticalDistance = distaceFromCenter(y, btnBox.y, btnBox.height);
  console.log("Vertical distance: ", verticalDistance);

  const horizontalOffset = btnBox.width / 2 + OFFSET;
  const verticalOffset = btnBox.height / 2 + OFFSET;

  console.log("Hor Offset: ", horizontalOffset, "Ver Offset: ", verticalOffset);

  if (
    Math.abs(horizontalDistance) <= horizontalOffset &&
    Math.abs(verticalDistance) <= verticalOffset
  ) {
    setButtonPosition(
      btnBox.x + (horizontalOffset / horizontalDistance) * 10,
      btnBox.y + (verticalOffset / verticalDistance) * 10
    );
  }
});

function setButtonPosition(left, top) {
  btn.style.top = top;
  btn.style;
}

function distaceFromCenter(mousePosition, boxPosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
