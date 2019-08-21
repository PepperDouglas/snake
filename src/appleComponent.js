let redApple = {
    color : 'red',
    width : 30,
    height : 30,
    location : 
        {x : null, y : null},
    position() {
        return Math.ceil(Math.random()*10)*30;
    }
}

let blueApple = {
    color : 'blue',
    width : 30,
    height : 30,
    location : [
        {x : 90, y : 60}
    ]
}

module.exports.blueApple = blueApple;
module.exports.redApple = redApple;
