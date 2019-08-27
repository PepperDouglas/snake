import { redSnake, greenSnake } from "./snakeComponent";
import { redApple, blueApple } from "./appleComponent";
import { getScoreTable, putScoreTable } from "./scoreControl";
// unused variables declared : redSnake, blueApple, playerTwo, badApple
let playerOne, playerTwo = {};
let goodApple, badApple = {};
let gameSpeed = 4;
let playerScore = 0;
let scoreTable = getScoreTable();
console.log(scoreTable);

function updateHighScore(num){
    let R = num;
    for (let i = 0; i < scoreTable.length; i++){
        if (num > scoreTable[i].score){
            num = scoreTable[i].score;
            scoreTable[i].score = R;
            updateHighScore(num);
            return scoreTable;
        }
    }
    return scoreTable;
}

// should be const, goes for all non primitives
let gameArea = {
    canvas : document.createElement('canvas'),
    area : document.getElementsByClassName('playArea')[0],
    init : function() {
        this.canvas.width = 660;
        this.canvas.height = 660;
        this.context = this.canvas.getContext('2d');
        this.area.appendChild(this.canvas);
        // setInterval vs requestAnimationFrame
        this.interval = setInterval(renderFrame, Math.floor(1000/gameSpeed));
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function createPlayer(snake){
    this.width = snake.width;
    this.height = snake.height;
    this.x = snake.parts[0].x;
    this.y = snake.parts[0].y;
    this.parts = snake.parts;
    this.direction = snake.parts[0].direction;
    this.update = function(){
        //1. set collision point that changes dir with timeout based on length
        //2. set timeout based on length, 3 change dir based on front tail piece
        //4. see bottom for solution
        for (let i = this.parts.length - 1; i > 0; i--){
            this.parts[i].direction = this.parts[i - 1].direction;
        }

        this.parts[0].direction = this.direction;

        for (let i = 0; i < this.parts.length; i++){
            if (this.parts[i].direction === 'RIGHT'){
                this.parts[i].x += this.width;
            } else if (this.parts[i].direction === 'LEFT') {
                this.parts[i].x -= this.width;
            } else if (this.parts[i].direction === 'DOWN') {
                this.parts[i].y -= this.height;
            } else if (this.parts[i].direction === 'UP') {
                this.parts[i].y += this.height;
            }
        }
        //self-hit
        for (let i = 1; i < this.parts.length; i++){
            if (this.parts[0].x === this.parts[i].x && this.parts[0].y === this.parts[i].y){
                scoreTable = updateHighScore(playerScore);
                displayScore();
                putScoreTable(scoreTable);
                clearInterval(gameArea.interval);
                goodApple, playerOne = {};
                console.log(goodApple);
                return;
            }
        }
        //this part only active if !powerup
        this.parts[0].x < playerOne.width ? endGame() :
            this.parts[0].x > gameArea.canvas.width - playerOne.width * 2 ? endGame() :
                this.parts[0].y < playerOne.height ? endGame() :
                    this.parts[0].y > gameArea.canvas.height - playerOne.height * 2 ? endGame () :
                        null;

        for (let i = 0; i < this.parts.length; i++){
            gameArea.context.fillStyle = snake.color;
            gameArea.context.fillRect(this.parts[i].x, this.parts[i].y, this.width, this.height);
        }
    }
}

let endGame = () => {
    scoreTable = updateHighScore(playerScore);
    displayScore();
    putScoreTable(scoreTable);
    clearInterval(gameArea.interval);
    // goodApple changes the value?
    goodApple, playerOne = {};
    return;
}

function createApple(apple){
    this.width = apple.width;
    this.height = apple.height;
    this.location = apple.location;
    this.location.x = apple.position();
    this.location.y = apple.position();
    this.update = function(){
        function noOverlap(){
            // preference, looks a bit "cleaner"
            playerOne.parts.forEach(part => {
                if (redApple.location.x === part.x && redApple.location.y === part.y){
                    redApple.location.x = apple.position();
                    redApple.location.y = apple.position();
                    noOverlap();
                }
            })
            // for (let i = 0; i < playerOne.parts.length; i++){
            //     if (redApple.location.x === playerOne.parts[i].x && redApple.location.y === playerOne.parts[i].y){
            //         redApple.location.x = apple.position();
            //         redApple.location.y = apple.position();
            //         noOverlap();
            //     }
            // }
        };

        noOverlap();
        gameArea.context.fillStyle = apple.color;
        gameArea.context.fillRect(this.location.x, this.location.y, this.width, this.height);
    }
    this.eatMe = function(){
        if(this.location.x === playerOne.parts[0].x && this.location.y === playerOne.parts[0].y){
            playerScore += gameSpeed;
            let tailLocation = [playerOne.parts[playerOne.parts.length - 1].x, playerOne.parts[playerOne.parts.length - 1].y];
            //snake break here?
            setTimeout(function(){
                playerOne.parts.push({
                    x : tailLocation[0],
                    y : tailLocation[1],
                    direction : null});
            }, Math.floor(1000/gameSpeed));
            return true;
        }
        return false;
    }
}

function startGame(){
    gameArea.init();
    playerOne = new createPlayer(greenSnake);
    goodApple = new createApple(redApple);
    window.addEventListener('keydown', function(e){
        let belowCheck = playerOne.parts[0].y + playerOne.height !== playerOne.parts[1].y;
        let rightCheck = playerOne.parts[0].x + playerOne.width !== playerOne.parts[1].x;
        let leftCheck = playerOne.parts[0].x - playerOne.width !== playerOne.parts[1].x;
        let topCheck = playerOne.parts[0].y - playerOne.width !== playerOne.parts[1].y;
        console.log(belowCheck, rightCheck, leftCheck, topCheck);
        switch(true){
            case e.keyCode === 37 && leftCheck : 
                playerOne.direction = 'LEFT';
            break;
            case e.keyCode === 38 && topCheck :
                playerOne.direction = 'DOWN';
            break;
            case e.keyCode === 39 && rightCheck :
                playerOne.direction = 'RIGHT';
            break;
            case e.keyCode === 40 && belowCheck :
                playerOne.direction = 'UP';
            break;
        }
    })
};

function displayScore(){
    let scoreText = 
        `<p>1st: ${scoreTable[0].score}</p><p>2nd: ${scoreTable[1].score}</p>
        <p>3rd: ${scoreTable[2].score}</p><p>4th: ${scoreTable[3].score}</p>`;
    document.getElementsByClassName('scoreHistory')[0].innerHTML = scoreText;
}

function borderControl(){
    gameArea.context.fillStyle = 'black';
    gameArea.context.fillRect(0, 0, gameArea.canvas.width, 30);
    gameArea.context.fillRect(0, 0, 30, gameArea.canvas.height);
    gameArea.context.fillRect(0, gameArea.canvas.height - 30, gameArea.canvas.width, gameArea.canvas.width);
    gameArea.context.fillRect(gameArea.canvas.width - 30, 0, gameArea.canvas.width, gameArea.canvas.height);
}


function renderFrame(){
    gameArea.clear();
    borderControl();
    playerOne.update();
    // eatMe breaks when I hit the wall
    goodApple.eatMe() ?
        goodApple = new createApple(redApple) : goodApple.update();
    document.getElementsByClassName('highScore')[0].innerText = playerScore;
}

startGame();

/*read directions to use
update the head direction
change positions based on direction
render*/