var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(8081));
// var socket = io();

var five = require('johnny-five')
    , led
    , toggleState = false;

app.use(express.static(__dirname + '/app'));

app.get('/', function (res) {
  	res.sendfile('/index.html');
});

var board = new five.Board({
  	repl:false,
    port:"COM3"
});


board.on('ready', function () {
    var commands;
    var led = new five.Led(13);
    
    commands = null;

    io.on('connection', function (socket) {
        socket.on('toggled', function () {
            toggleLED(led);
        });
    });
});


function toggleLED(led){
    io.emit('toggled');
    toggleState = !toggleState;
    
    if (toggleState) led.on();
    else led.off();
}

document.getElementById('toggled').onclick = toggleLED;