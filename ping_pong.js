import Ball from './Ball.js';
import paddle from './Paddle.js';

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new paddle(document.getElementById("player-paddle"));
const computerPaddle = new paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let ballSpeed = 1; // Adjust the initial speed value as needed
let isSpacebarPressed = false;

let lastTime;
let gameRunning = false; // Track the state of the game

function update(time) {
  if (lastTime != null && gameRunning) {
    // Update function
    const delta = time - lastTime;
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) handleLoose();

      // Adjust ball speed based on spacebar press
      const speedMultiplier = isSpacebarPressed ? 1.5 : 1;
    
    ball.update(delta * ballSpeed * speedMultiplier, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.x);
  }


  lastTime = time;
  // Rather than setInterval. The requestAnimationFrame loop continues, and the update function will be called repeatedly on each frame,  (typically 60 times per second).
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.bottom >= window.innerHeight || rect.top <= 0;
}

function handleLoose() {
  const rect = ball.rect();

  if (rect.top <= 0) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else if (rect.bottom >= window.innerHeight) {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }

  let value = Math.max(parseInt(playerScoreElem.textContent), parseInt(computerScoreElem.textContent));
  let player1 = parseInt(playerScoreElem.textContent);
  let player2 = parseInt(computerScoreElem.textContent);
  // let highestsc = localStorage.getItem("highestScore");
  if (player2 > player1) {
    localStorage.setItem("name", "Computer");
   
  } else {
    localStorage.setItem("name", "Human");
  }

  localStorage.setItem("key", value);
   
  ball.reset();
  computerPaddle.reset();
  
let Score = localStorage.getItem("key");
let showName = localStorage.getItem("name");


window.alert(showName + " " + "win with" + " " + Score + "score");

playerScoreElem.textContent =0;
computerScoreElem.textContent =0;

}

let highscore = localStorage.getItem("highestScore");
let displayName = localStorage.getItem("name");

if (highscore > 0) {
  window.alert(displayName + " " + "has made Highest Score" + " " + highscore);
} else {
  window.alert("This is your first game");
}

document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') { // Check if the pressed key is the spacebar
    isSpacebarPressed = true;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.code === 'Space') { // Check if the pressed key is the spacebar
    isSpacebarPressed = false;
  }
});


document.addEventListener('mousemove', e => {
  playerPaddle.position = (e.x / window.innerWidth) * 100;
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'a' || event.key === 'A') {
    playerPaddle.keyState.a = true;
    playerPaddle.updatePosition();
  } else if (event.key === 'd' || event.key === 'D') {
    playerPaddle.keyState.d = true;
    playerPaddle.updatePosition();
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'a' || event.key === 'A') {
    playerPaddle.keyState.a = false;
  } else if (event.key === 'd' || event.key === 'D') {
    playerPaddle.keyState.d = false;
  }

  if (event.key === 'Enter') {
    if (gameRunning) {
      gameRunning = false; // Stop the game
    } else {
      gameRunning = true; // Start the game
      window.requestAnimationFrame(update); // Start the game loop
    }
  }
});

document.addEventListener('keydown', function(event) {
 
});

function gameLoop() {
  playerPaddle.updatePosition();
  

  window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
  



