// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
let speed = 5;
setInterval(() => {
  if (speed < 18) {
    speed += 1;
  }
}, 10000);
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 1, y: 1 }];

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      score = 0;
      speed = 5;
      scoreBox.innerHTML = "Score: " + score;
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 27 ||
    snake[0].y <= 0
  ) {
    score = 0;
    speed = 5;
    scoreBox.innerHTML = "Score: " + score;
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 1, y: 1 }];
    score = 0;
    speed = 5;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 1;
    let b = 17;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (26 - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

function ArrowLeft() {
  inputDir.x = -1;
  inputDir.y = 0;
  moveSound.play();
}
function ArrowRight() {
  inputDir.x = 1;
  inputDir.y = 0;
  moveSound.play();
}
function ArrowUp() {
  inputDir.x = 0;
  inputDir.y = -1;
  moveSound.play();
}
function ArrowDown() {
  inputDir.x = 0;
  inputDir.y = 1;
  moveSound.play();
}

