import { redSnake } from "./snakeComponent";

//the game area
let gameArea = {
    canvas : document.createElement('canvas'),
    area : document.getElementsByClassName('playArea')[0],
    init : function() {
        this.canvas.width = 420;
        this.canvas.height = 420;
        this.context = this.canvas.getContext('2d');
        this.area.appendChild(this.canvas);
    }
}

function snakePart(width, heigth, color, snake){
    this.width = width;
    this.heigth = heigth;
    this.x = x;
    this.y = y;
    gameArea.context.fillStyle = color;
    gameArea.context.fillRect(this.x, this.y, this.width, this.heigth);
}

function startGame(){
    gameArea.init();
    let playerOne = new snakePart(30, 30, 'green', 30, 30);

};

startGame();