const INITIAL_VELOCITY = 0.03;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  constructor(ballEl) {
    this.ballEl = ballEl;
    this.reset();
  }

  get x() {
    return Number.parseFloat(
      getComputedStyle(this.ballEl).getPropertyValue("--x")
    );
  }

  set x(value) {
    this.ballEl.style.setProperty("--x", value);
  }

  get y() {
    return Number.parseFloat(
      getComputedStyle(this.ballEl).getPropertyValue("--y")
    );
  }

  set y(value) {
    this.ballEl.style.setProperty("--y", value);
  }

  rect() {
    return this.ballEl.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.velocity = INITIAL_VELOCITY;
    this.direction = { x: 0 };

    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const direction = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(direction), y: Math.sin(direction) };
    }
  }

  updatePosition(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    this.velocity += VELOCITY_INCREASE * delta;

    const ballRect = this.rect();

    // hit top/bottom ?
    if (ballRect.bottom >= window.innerHeight || ballRect.top <= 0) {
      this.direction.y *= -1;
    }

    // hit paddle ?
    if (paddleRects.some((paddle) => isCollision(paddle, ballRect)))
      this.direction.x *= -1;

    // if (
    //   ballRect.bottom <= playerPaddleRect.bottom &&
    //   ballRect.top >= playerPaddleRect.top &&
    //   ballRect.left <= playerPaddleRect.right
    // )
    //   this.direction.x *= -1;

    // if (
    //   ballRect.bottom <= computerPaddleRect.bottom &&
    //   ballRect.top >= computerPaddleRect.top &&
    //   ballRect.right >= computerPaddleRect.left
    // )
    //   this.direction.x *= -1;
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(paddleRect, ballRect) {
  return (
    ballRect.top >= paddleRect.top &&
    ballRect.bottom <= paddleRect.bottom &&
    ballRect.right >= paddleRect.left &&
    ballRect.left <= paddleRect.right
  );
}
