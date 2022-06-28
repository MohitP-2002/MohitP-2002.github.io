const canvas = document.getElementById("myCanvas");
const pen = canvas.getContext("2d");
class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const snakeParts = [];
let speed = 15;
let headX = 10;
let headY = 10;
let tail = 30;
let tailLength = 2;
let velocityX = 0;
let velocityY = 0;
let tailSize = canvas.width / 30;
let cakeX = Math.floor(Math.random() * 20);
let cakeY = Math.floor(Math.random() * 20);
let score = 0;
let val = "NoName";
let gameType;
val = prompt("What is you Name?");
while (!val) {
  val = prompt("What is you Name?");
}
speed = prompt("What is you Preferred Speed (5, 10, 15, 20 ..)?");
drawGame();
function drawGame() {
  updateSnakePosition();
  let gameResult = isGameOver();
  if (gameResult) {
    return;
  }
  clearScreen();
  drawScore();
  drawName();
  drawSnake();
  drawCake();
  updateCakePositionOnCollision();
  setTimeout(drawGame, 1000 / speed);
}
function drawName() {
  pen.fillStyle = "white";
  pen.font = "20px Arial";
  pen.fillText("NAME: " + val, 400, 20);
}
function drawScore() {
  pen.fillStyle = "white";
  pen.font = "20px Arial";
  pen.fillText("Score: " + score, 10, 20);
}
function isGameOver() {
  let ans = false;
  if (headX < 0 || headX >= 20 || headY < 0 || headY >= 20) {
    ans = true;
  }
  for (let i = 2; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      ans = true;
      break;
    }
  }
  if (ans) {
    pen.fillStyle = "white";
    pen.font = "30px Arial";
    pen.fillText(
      val + " your score is = " + score,
      canvas.width / 5,
      canvas.height / 2
    );
    playAgain.style.display = "block";
  }
  return ans;
}
function clearScreen() {
  pen.fillStyle = "black";
  pen.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
  pen.fillStyle = "blue";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    pen.fillRect(part.x * tail, part.y * tail, tailSize, tailSize);
  }

  snakeParts.push(new Snake(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  pen.fillStyle = "yellow";
  pen.fillRect(headX * tail, headY * tail, tailSize, tailSize);
}
function drawCake() {
  pen.fillStyle = "white";
  pen.fillRect(cakeX * tail, cakeY * tail, tailSize, tailSize);
}
function updateSnakePosition() {
  headX += velocityX;
  headY += velocityY;
}
function updateCakePositionOnCollision() {
  if (headX == cakeX && headY == cakeY) {
    cakeX = Math.floor(Math.random() * 20);
    cakeY = Math.floor(Math.random() * 20);
    tailLength++;
    score++;
  }
}
document.body.addEventListener("keydown", keyDownPress);
function keyDownPress(e) {
  if (e.keyCode == 38 || e.keyCode == 87) {
    if (velocityY == 1) return;
    velocityY = -1;
    velocityX = 0;
  }
  if (e.keyCode == 40 || e.keyCode == 83) {
    if (velocityY == -1) return;
    velocityY = 1;
    velocityX = 0;
  }

  if (e.keyCode == 37 || e.keyCode == 65) {
    if (velocityX == 1) return;
    velocityY = 0;
    velocityX = -1;
  }

  if (e.keyCode == 39 || e.keyCode == 68) {
    if (velocityX == -1) return;
    velocityY = 0;
    velocityX = 1;
  }
}
