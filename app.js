/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , jade = require('jade')
  ;
  
  
var five = require('johnny-five')
  , board = new five.Board({ port: "COM3", repl:false})
  , led
  , toggleState = false;
  
// var fs = require("fs");
// var data = fs.readFileSync('input.txt');

// console.log(data.toString());
// console.log("Program Ended");

  
var app = express()


function toggleLED(led){
    toggleState = !toggleState;
    
    if (toggleState) led.on();
    else led.off();
}

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
    
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  
  res.render('index',
  { title : 'Home' }
  )
  
})
app.listen(3000)

// app.get('/', function (req, res) {
//   var led = new five.Led(13);
//   res.end('Hi there!')
  
//   toggleLED(led);
  
// })
// app.listen(3000)


  // board.on("ready", function() {
  //     console.log('board ready');
  //     led = new five.Led(13);
      
  //     // toggleLED();
  //     setInterval(toggleLED, 500);
      
  // });


  // console.log ( "\n waiting for device to connect ")
  