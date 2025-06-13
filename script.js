const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;

let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "";
let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};

document.addEventListener("keydown", directionControl);

function directionControl(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#00ffc8" : "#00bfa5";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#ff0040";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Game over
  if (
    headX < 0 || headY < 0 ||
    headX >= canvas.width || headY >= canvas.height ||
    snake.some((segment, index) => index !== 0 && segment.x === headX && segment.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over! 🪦");
    document.location.reload();
    return;
  }

  let newHead = { x: headX, y: headY };

  // Comer maçã
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

let game = setInterval(draw, 150);
