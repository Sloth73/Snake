//Event listener
document.addEventListener('keydown', whichKey);

//Canvas background style
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const header = document.querySelector('h1');

//Game
const tileSize = 50;
let gameIsNotOver = true;

//Snake 
let snakeSpeed = tileSize;

let snakePositionX = 0;
let snakePositionY = canvas.height/2 - tileSize;

let movingOnX = 0;
let movingOnY = 0;

let tail = [];
let snakeLength = 1;

//Food position
let foodPositionX = 0;
let foodPositionY = 0;

//Tile count
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

//Score
let score = 0;

//Running the game
function gameCycle() {
if (gameIsNotOver) {
    moveWithSnake();
    drawEverything();
   
    setTimeout(gameCycle, 1000/15);
    }
}
resetFoodPosition()
gameCycle()

//Moving with snake
function moveWithSnake() {

    snakePositionX += snakeSpeed * movingOnX;
    snakePositionY += snakeSpeed * movingOnY;

    //Wall collision
    if (snakePositionX > canvas.width - tileSize) {
        snakePositionX = 0;
    }
    if (snakePositionX < 0) {
        snakePositionX = canvas.width;
    }
    if (snakePositionY > canvas.height - tileSize) {
        snakePositionY = 0;
    }
    if (snakePositionY < 0) {
        snakePositionY = canvas.height;
    }
    //Food collision
    if (snakePositionX === foodPositionX && snakePositionY === foodPositionY) {
        score ++
        header.textContent = score;
        snakeLength ++
        resetFoodPosition();
    }

    //Self collision
    tail.forEach(snakePart => {
        if (snakePositionX === snakePart.x && snakePositionY === snakePart.y && score != 0) {
            gameIsNotOver = false;
            alert('GAME OVER!')
        }
    });
        
    //tail
    tail.push({x: snakePositionX, y: snakePositionY});

    //Snake length
    tail = tail.slice(-1 * snakeLength);
}
//Drawing everything
function drawEverything() {

    //Draw Canvas
    drawRectangle(0, 0, canvas.width, canvas.height, 'lightgray');
    
    //Draw grid
    drawGrid();

    //Draw tail
    tail.forEach(snakePart => 
        drawRectangle(snakePart.x, snakePart.y, tileSize, tileSize, 'gray'))

    //Draw snake
    drawRectangle(snakePositionX, snakePositionY, tileSize, tileSize, 'black');

    //Draw food
    drawRectangle(foodPositionX, foodPositionY, tileSize, tileSize, 'lightblue');

}
//Keyboard
function whichKey(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (movingOnY != 1) {
            movingOnY = -1;
            movingOnX = 0;
            }
            break;
        case 'ArrowDown':
            if (movingOnY != -1) {
            movingOnY = 1;
            movingOnX = 0;
            }
            break;
        case 'ArrowLeft':
            if (movingOnX != 1) {
            movingOnX = -1;
            movingOnY = 0;
            }
            break;
        case 'ArrowRight':
            if (movingOnX != -1) {
            movingOnX = 1;
            movingOnY = 0;
            }
            break;
    }
}

//Draw rectangle
function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

//Draw grid
function drawGrid() {
    for (let i = 0; i < canvas.width / tileSize; i++) {
        for (let index = 0; index < canvas.height / tileSize; index++) {
            drawRectangle(tileSize * i, tileSize * index, tileSize - 1, tileSize - 1, 'white');
        } 
    }           
}

//Reset food position
function resetFoodPosition() {
        foodPositionX = (Math.floor(Math.random() * tileCountX) * tileSize);
        foodPositionY = (Math.floor(Math.random() * tileCountY) * tileSize);
    
}
