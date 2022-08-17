var Block_SIZE = 20;
var Block_COUNT = 20;

var gameInterval;
var snake;
var apple;
var score = 0;
var addPoint = 1;

function gameStart(){
    if (gameInterval) {
        score = 0;
        addPoint = 1;
        clearInterval(gameInterval)
    }
    snake = {
        body:[
            {x : Block_COUNT / 2, y : Block_COUNT / 2}
        ],
        size: 1,
        direction:{ x : 0, y : -1 }
    };
    putApple();
    updataScore(0);
    gameInterval = setInterval(gameRoutine, 100); // 每隔 x 秒執行一次 function
}

function updataScore(newScore){
    score = newScore;
    document.getElementById('score_id').innerHTML = score; // 更改文字內容
}

function putApple(){
    apple = {
        x : Math.floor(Math.random() * Block_COUNT),
        y : Math.floor(Math.random() * Block_COUNT)
    };
    for(var i = 0; i < snake.body.length; i++){
        if(apple.x === snake.body[i].x 
            && apple.y === snake.body[i].y){
            putApple();
            break;
        }
    }
}

function eatApple(){
    snake.size += 1;
    putApple();
    if(score != 0 && score % 5 == 0){
        addPoint += 1
    }
    updataScore(score + addPoint);
}

function gameRoutine(){
    moveSnake(); 

    if(snakeIsDead()){
        gameEnd();
        return;
    }

    if(snake.body[0].x === apple.x && snake.body[0].y === apple.y){
        eatApple();        
    }
    updataCanvas();
}

function snakeIsDead(){
    if(snake.body[0].x < 0 || snake.body[0].x > Block_COUNT){
        return true;
    } else if(snake.body[0].y < 0 || snake.body[0].y > Block_COUNT){
        return true;
    }

    for(var i = 1; i < snake.body.length; i++){
        if(snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y){
            return true;
        }
    }
    return false;
}

function gameEnd(){
    clearInterval(gameInterval);
}

function moveSnake(){
    var newBlock = {
        x : snake.body[0].x + snake.direction.x,
        y : snake.body[0].y + snake.direction.y
    };

    snake.body.unshift(newBlock); // 將內容加至 list 最前

    while(snake.body.length > snake.size){
        snake.body.pop();
    }
}

function updataCanvas(){
    var canvas = document.getElementById('canvas_id');
    var context = canvas.getContext('2d');

    context.fillStyle = 'black'; // 設定畫筆顏色
    context.fillRect(0, 0, canvas.width, canvas.height) // 設定畫的範圍（x 座標、y 座標、寬、高）

    context.fillStyle = 'lime';
    for(var i = 0; i < snake.body.length; i++){
        context.fillRect(
            snake.body[i].x * Block_SIZE + 1,
            snake.body[i].y * Block_SIZE + 1, 
            Block_SIZE - 1, Block_SIZE - 1);
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x * Block_COUNT + 1, apple.y * Block_COUNT + 1, Block_SIZE - 1, Block_SIZE - 1);
}

window.onload = onPageLoaded; // 頁面讀取時執行 functions

function onPageLoaded(){
    document.addEventListener('keydown', handleKeyDown); // 監聽鍵盤行為，並執行 functions
}

function handleKeyDown(event){
    var tmpX = snake.direction.x;
    var tmpY = snake.direction.y;
    console.log(event);
    if(event.keyCode === 37){ // 左鍵 37 右鍵 39
        snake.direction.x = tmpY;
        snake.direction.y = -tmpX;
    } else if(event.keyCode === 39){
        snake.direction.x = -tmpY;
        snake.direction.y = tmpX;
    }
}