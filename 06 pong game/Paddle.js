const COMPUTER_SPEED = 0.017;

export default class Paddle {
  constructor(paddleElement) {
    this.paddleElement = paddleElement;
    this.reset();
  }

  rect() {
    return this.paddleElement.getBoundingClientRect();
  }

  reset() {
    this.position = 50;
  }

  get position() {
    return Number.parseFloat(
      getComputedStyle(this.paddleElement).getPropertyValue("--position")
    );
  }

  set position(value) {
    this.paddleElement.style.setProperty("--position", value);
  }

  updatePaddle(delta, ballPositionY) {
    this.position += delta * (ballPositionY - this.position) * COMPUTER_SPEED;

    const computerPaddleRect = this.rect();

    if (computerPaddleRect.bottom >= window.innerHeight) this.position = 94;
    if (computerPaddleRect.top <= 0) this.position = 6;
  }
}
