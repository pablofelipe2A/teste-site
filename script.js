const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const bgMusic = document.getElementById("bg-music");
const hitSound = document.getElementById("hit-sound");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");

const messageBox = document.getElementById("message");
const messageText = document.getElementById("msg-text");

let playerScore = 0;
let aiScore = 0;
let gameOver = false;

const paddle = {
  width: 10,
  height: 100,
  dy: 6
};

const player = {
  x: 10,
  y: canvas.height / 2 - paddle.height / 2,
  ...paddle
};

const ai = {
  x: canvas.width - 20,
  y: canvas.height / 2 - paddle.height / 2,
  ...paddle
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  dx: 5,
  dy: 5
};

const obstacles = [
  { x: canvas.width / 2 - 10, y: 100, width: 20, height: 50 },
  { x: canvas.width / 2 - 10, y: 250, width: 20, height: 50 },
  { x: canvas.width / 2 - 10, y: 400, width: 20, height: 50 }
];

function drawRect({ x, y, width, height }, color = "#fff") {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawCircle({ x, y, radius }, color = "#fff") {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawScore() {
  ctx.fillStyle = "#0ff";
  ctx.font = "32px Arial";
  ctx.fillText(`${playerScore} - ${aiScore}`, canvas.width / 2 - 40, 40);
}

function drawObstacles() {
  ctx.fillStyle = "#555";
  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
  }
}
