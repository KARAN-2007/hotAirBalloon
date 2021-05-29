var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(displayWidth,displayHeight);
  database=firebase.database();

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  
 var balloonPos=database.ref('balloon/position')
  balloonPos.on("value",readPosition,showError)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    writePosition(-2,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(2,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    writePosition(0,-2)
    balloon.scale=balloon.scale+0.001
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    
    //write code to move air balloon in down direction
    writePosition(0,2)
    balloon.scale=balloon.scale-0.001
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function writePosition(x,y){
  database.ref('balloon/position').set({
  x:position.x+x,
  y:position.y+y
  })
}
function readPosition(data){
    position=data.val()
    balloon.x=position.x
    balloon.y=position.y
}
function showError(){
  console.log("error")
}