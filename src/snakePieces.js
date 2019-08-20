function snakePart(width, heigth, color, x, y){
    this.width = width;
    this.heigth = heigth;
    this.x = x;
    this.y = y;
    gameArea.context.fillStyle = color;
    gameArea.context.fillRect(this.x, this.y, this.width, this.heigth);
}


module.exports.snakePart = snakePart;