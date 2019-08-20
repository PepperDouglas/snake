import { redSnake } from "./snakeComponent";
import { snakePart } from "./snakePieces";

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

function startGame(){
    gameArea.init();

};

startGame();