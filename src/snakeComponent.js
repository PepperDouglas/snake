let redSnake = {
    color : 'red',
    width : 30,
    height : 30,
    parts : [
        {x : 50, y : 50}
    ]
}

let greenSnake = {
    color : 'green',
    width : 30,
    height : 30,
    parts : [
        {x : 120, y : 30, direction : 'RIGHT'},
        {x : 90, y : 30, direction : 'RIGHT'},
        {x : 60, y : 30, direction : 'RIGHT'},
        {x : 30, y : 30, direction : 'RIGHT'}
    ]
}

module.exports.redSnake = redSnake;
module.exports.greenSnake = greenSnake;
