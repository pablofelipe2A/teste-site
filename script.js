const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const messageBox = document.getElementById("message");

const paddleWidth = 10;
const paddleHeight = 100;
let upArrowPressed = false;
let downArrowPressed = false;

let playerScore = 0;
let aiScore = 0;
let gameOver = false;

const player = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  dy: 5
};

const ai = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  dy: 4
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  dx: 5,
  dy: 5,
  color: "white"
};

// Obstáculos no meio do campo
const obstacles = [
  { x: canvas.width / 2 - 10, y: 100, width: 20, height: 50 },
  { x: canvas.width / 2 - 10, y: 250, width: 20, height: 50 },
  { x: canvas.width / 2 - 10, y: 400, width: 20, height: 50 }
];

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawScore() {
  ctx.fillStyle = "#0ff";
  ctx.font = "32px Arial";
  ctx.fillText(`${playerScore} - ${aiScore}`, canvas.width / 2 - 40, 40);
}

function drawObstacles() {
  ctx.fillStyle = "#555";
  obstacles.forEach(ob => {
    ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawScore();
  drawObstacles();
}

function update() {
  if (gameOver) return;

  if (upArrowPressed && player.y > 0) player.y -= player.dy;
  if (downArrowPressed && player.y < canvas.height - player.height) player.y += player.dy;

  if (ball.y < ai.y + ai.height / 2) ai.y -= ai.dy;
  else ai.y += ai.dy;

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  let playerCollision = ball.x - ball.radius < player.x + player.width &&
                        ball.y > player.y &&
                        ball.y < player.y + player.height;

  let aiCollision = ball.x + ball.radius > ai.x &&
                    ball.y > ai.y &&
                    ball.y < ai.y + ai.height;

  if (playerCollision || aiCollision) {
    ball.dx *= -1;
  }

  // Colisão com obstáculos
  obstacles.forEach(ob => {
    if (
      ball.x + ball.radius > ob.x &&
      ball.x - ball.radius < ob.x + ob.width &&
      ball.y + ball.radius > ob.y &&
      ball.y - ball.radius < ob.y + ob.height
    ) {
      ball.dx *= -1;
    }
  });

  if (ball.x < 0) {
    aiScore++;
    resetBall();
  }

  if (ball.x > canvas.width) {
    playerScore++;
    resetBall();
  }

  checkWinCondition();
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx *= Math.random() > 0.5 ? 1 : -1;
  ball.dy = (Math.random() * 6) - 3;
}

function checkWinCondition() {
  if (playerScore === 5) {
    messageBox.textContent = "VOCÊ GANHOU!";
    endGame();
  } else if (aiScore === 5) {
    messageBox.textContent = "SE F*DEU 😈";
    endGame();
  }
}

function endGame() {
  gameOver = true;
  messageBox.classList.remove("hidden");
}

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp") upArrowPressed = true;
  if (e.key === "ArrowDown") downArrowPressed = true;
});

document.addEventListener("keyup", function(e) {
  if (e.key === "ArrowUp") upArrowPressed = false;
  if (e.key === "ArrowDown") downArrowPressed = false;
});

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
