// first defining initial velocity
const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE =.000001;

 // creating class Ball
export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }
     
    //take values of x and y from css and use in js
    get x (){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    set x(value){
        this.ballElem.style.setProperty("--x", value)
    }

    get y (){
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    set y(value){
        this.ballElem.style.setProperty("--y", value)
    }

    //ball bounces off top and bottom right and left of screen using getBoundingClientRect

    rect(){
        return this.ballElem.getBoundingClientRect()
    }

    
    // creating reset function to reset values
    reset(){
        this.x = 50;
        this.y = 50;
        // direction using unit vector
        this.direction = {x: 0};
        //heading in terms of radians 0 to 360 degree
        while(Math.abs(this.direction.x) <=.2 || Math.abs(this.direction.x) >=.9){
            //gatting random number between 0 to 360
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
           this.velocity = INITIAL_VELOCITY;
    }
    
    

    // ball has x,y position direction and velocity
    update(delta, paddleRects){
        this.x += this.direction.x * this.velocity * delta;
        this.y  += this.direction.y * this.velocity * delta;
        // increase velocity of ball as time goes 
        this.velocity += VELOCITY_INCREASE * delta;

        const rect = this.rect();
        //ball bounces off top and bottom right 
        if(paddleRects.some(r => isCollision(r,rect))){
          this.direction.y *= -1;            
        }
        //ball bounces off  right and left of screen 
        if(rect.right >= window.innerWidth || rect.left<=0){
            this.direction.x *= -1;            
          }

        }  
}


    function randomNumberBetween(min, max){
        return Math.random() * (max - min) + min;
    }


    function isCollision(rect1, rect2){
       return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
       )
    }









