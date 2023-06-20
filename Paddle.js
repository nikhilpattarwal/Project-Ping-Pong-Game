const SPEED =.02;

export default class Paddle {
    constructor(paddleElem) {
      this.paddleElem = paddleElem;
      this.keyState = {
        a: false,
        d: false
      };
      this.reset()
    }
  
    // Function to move the player paddle left
    moveLeft() {
      const currentPosition = this.position;
      const newPosition = Math.max(currentPosition - 1, 0);
      this.position = newPosition;
    }
  
    // Function to move the player paddle right
    moveRight() {
      const currentPosition = this.position;
      const newPosition = Math.min(currentPosition + 1, 100);
      this.position = newPosition;
    }
  
    get position() {
      return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }
  
    set position(value) {
      this.paddleElem.style.setProperty("--position", value);
    }

    rect(){
      return this.paddleElem.getBoundingClientRect();
    }

    reset(){
      this.position = 50;
    }
  
    updatePosition() {
      if (this.keyState.a) {
        this.moveLeft();
      }
  
      if (this.keyState.d) {
        this.moveRight();
      }
    }

    update(delta, ballHeight){
      this.position += SPEED *delta * (ballHeight - this.position)    
    }

  }
  
  