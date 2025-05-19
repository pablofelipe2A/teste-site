const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
let upArrowPressed = false;
let downArrowPressed = false;

// Objetos
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
  speed: 5,
  dx: 5,
  dy: 5,
  color: "white"
};

// Funções de desenho
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Movimento e colisão
function update() {
  if (upArrowPressed && player.y > 0) player.y -= player.dy;
  if (downArrowPressed && (player.y < canvas.height - player.height)) player.y += player.dy;

  // Movimento da IA
  if (ball.y < ai.y + ai.height / 2) ai.y -= ai.dy;
  else ai.y += ai.dy;

  // Movimento da bola
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Rebater nas paredes
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Rebater nas raquetes
  let playerCollision = ball.x - ball.radius < player.x + player.width &&
                        ball.y > player.y &&
                        ball.y < player.y + player.height;

  let aiCollision = ball.x + ball.radius > ai.x &&
                    ball.y > ai.y &&
                    ball.y < ai.y + ai.height;

  if (playerCollision || aiCollision) {
    ball.dx *= -1;
  }

  // Resetar bola se sair
  if (ball.x < 0 || ball.x > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
  }
}

// Controle
document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp") upArrowPressed = true;
  if (e.key === "ArrowDown") downArrowPressed = true;
});

document.addEventListener("keyup", function(e) {
  if (e.key === "ArrowUp") upArrowPressed = false;
  if (e.key === "ArrowDown") downArrowPressed = false;
});

// Loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
