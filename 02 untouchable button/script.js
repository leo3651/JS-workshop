const btn = document.querySelector(".cant-touch-this");
const OFFSET = 100;

btn.addEventListener("click", function (e) {
  alert("Nice try!");
  window.close();
});

document.addEventListener("mousemove", function (e) {
  const x = e.pageX;
  const y = e.pageY;

  const btnBox = btn.getBoundingClientRect();

  const horizontalDistance = distaceFromCenter(btnBox.x, x, btnBox.width);
  const verticalDistance = distaceFromCenter(btnBox.y, y, btnBox.height);

  const horizontalOffset = btnBox.width / 2 + OFFSET;
  const verticalOffset = btnBox.height / 2 + OFFSET;

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
  const windowBox = document.body.getBoundingClientRect();
  const btnBox = btn.getBoundingClientRect();

  if (distaceFromCenter(left, windowBox.left, btnBox.width) < 0)
    left = windowBox.right - btnBox.width - OFFSET;

  if (distaceFromCenter(left, windowBox.right, btnBox.width) > 0)
    left = windowBox.left + OFFSET;

  if (distaceFromCenter(top, windowBox.top, btnBox.height) < 0)
    top = windowBox.bottom - btnBox.height - OFFSET;

  if (distaceFromCenter(top, windowBox.bottom, btnBox.height) > 0)
    top = windowBox.top + OFFSET;

  btn.style.top = `${top / 10}rem`;
  btn.style.left = `${left / 10}rem`;
}

function distaceFromCenter(boxPosition, mousePosition, boxSize) {
  return boxPosition - mousePosition + boxSize / 2;
}
