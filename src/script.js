import { redSnake, greenSnake } from "./snakeComponent";
import { redApple, blueApple } from "./appleComponent";
let playerOne, playerTwo = {};
let goodApple, badApple = {};
let gameSpeed = 7;
let playerScore = 0;

//the game area
let gameArea = {
    canvas : document.createElement('canvas'),
    area : document.getElementsByClassName('playArea')[0],
    init : function() {
        this.canvas.width = 420;
        this.canvas.height = 420;
        this.context = this.canvas.getContext('2d');
        this.area.appendChild(this.canvas);
        this.interval = setInterval(renderFrame, 1000/gameSpeed);
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
            gameArea.context.fillStyle = snake.color;
            gameArea.context.fillRect(this.parts[i].x, this.parts[i].y, this.width, this.height);
        }
    }
}

function createApple(apple){
    this.width = apple.width;
    this.height = apple.height;
    this.location = apple.location;
    this.location.x = apple.position();
    this.location.y = apple.position();
    //this.location = apple.location[0];
    this.update = function(){
        gameArea.context.fillStyle = apple.color;
        gameArea.context.fillRect(this.location.x, this.location.y, this.width, this.height);
    }
    this.eatMe = function(){
        if(this.location.x === playerOne.parts[0].x && this.location.y === playerOne.parts[0].y){
            playerScore += gameSpeed;
            let tailLocation = [playerOne.parts[playerOne.parts.length - 1].x, playerOne.parts[playerOne.parts.length - 1].y];
            console.log('eaten');
            setTimeout(function(){
                playerOne.parts.push({
                    x : tailLocation[0],
                    y : tailLocation[1],
                    direction : null});
                console.log(playerOne.parts);
            }, 1000/gameSpeed);
            return true;
        }
        return false;
    }
}
//playerOne.parts[playerOne.parts.length - 1].y eatme x/y
function startGame(){
    gameArea.init();
    playerOne = new createPlayer(greenSnake);
    goodApple = new createApple(redApple);
    window.addEventListener('keydown', function(e){
        switch(true){
            //extra check can be removed if we just check behind it
            case e.keyCode === 37 && playerOne.direction !== 'RIGHT' : 
                playerOne.direction = 'LEFT';
            break;
            case e.keyCode === 38 && playerOne.direction !== 'UP' :
                playerOne.direction = 'DOWN';
            break;
            case e.keyCode === 39 && playerOne.direction !== 'LEFT' :
                playerOne.direction = 'RIGHT';
            break;
            case e.keyCode === 40 && playerOne.direction !== 'DOWN' :
                playerOne.direction = 'UP';
            break;
        }
    })
};


function renderFrame(){
    gameArea.clear();
    playerOne.update();
    goodApple.eatMe() ?
        goodApple = new createApple(redApple) : goodApple.update();
}

startGame();

/*read directions to use
update the head direction
change positions based on direction
render*/