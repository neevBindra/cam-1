var bg , bgImg;
var ironman , imanImg;
var sword, swordImg, swordGrp;
var stones, stonesGrp;
var hammer, hammerImg, hammerGrp;
var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var gameOver, gameOverImg;


  var score = 0;


function preload(){
  bgImg = loadImage("bg2.png");
  imanImg = loadImage("iman.png");
  swordImg = loadImage("sword1.png");
  gemsImg = loadImage("gems1.png");
  hammerImg = loadImage("hammer1.png")
  gameOverImg = loadImage("gameover1.jpg")
  lokiImg = loadImage("loki 1.png");
}





function setup() {
  createCanvas(600, 600);
  
  bg = createSprite(300,300);
  bg.addImage  (bgImg);
  bg.velocityY = (2+3*score/100);
  
  ironman = createSprite(300,350,10,10);
  ironman.addImage(imanImg);
  ironman.scale = 0.1;
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.50;
  gameOver.visible = false;
  
 
  stonesGrp = new Group();
  swordGrp = new Group();
  hammerGrp = new Group();
  
  ironman.debug = false;
  ironman.setCollider("rectangle",0,0,30,ironman.height)
  
  
  
}

function draw() {
  background("bgImg");
  
  camera.position.x = ironman.position.x -1
 
  
if(gameState===PLAY){
    if(bg.y>500){
    bg.y = 300;
  }
  spawnSwords();
  hammer();
  
  
  
  if(keyDown("left_arrow")){
    ironman.x = ironman.x-5;
  }
  
    if(keyDown("right_arrow")){
    ironman.x = ironman.x+5;
  }
  
  if(keyDown("space")){
   var temp_stones = createstones();
    temp_stones.addImage(gemsImg);
    temp_stones.lifetime = 450;
    temp_stones.x = ironman.x;
  }
    if(stonesGrp.isTouching(hammerGrp)){
      stonesGrp.destroyEach();
     hammerGrp.destroyEach();
     score = score + 50
  
    }
  
      if(stonesGrp.isTouching(swordGrp)){
      stonesGrp.destroyEach();
     swordGrp.destroyEach();
     score = score + 20
  
    }
  
   if(ironman.isTouching(swordGrp)||hammerGrp.isTouching(ironman)){
        gameState = END;
      }
    }
  if(gameState===END){
    ironman.destroy();
    bg.velocityY = 0;
    gameOver.visible = true;
    swordGrp.destroyEach();
    hammerGrp.destroyEach();
    bg.visible = false;
}
   drawSprites();
  fill("white");
  textSize(30);
  text("score:"+ score,450,300);

  }

  
  



function spawnSwords(){
  if(frameCount%100===0){
  var  sword = createSprite(150,-50);
    sword.addImage(swordImg);
    sword.x = Math.round(random(150,400));
    sword.velocityY = (4+score/100);
    sword.lifeTime = 450;
    sword.scale = 0.4;
    swordGrp.add(sword)
  }
}

function createstones(){
  var stones = createSprite(300,350,10,10);
  stones.velocityY = -4;
  stones.scale = 0.1;
  stonesGrp.add(stones)
  return stones;
}

function hammer(){
  if(frameCount%250===0){

              var hammer = createSprite(200,150,30,30);
  hammer.addImage(hammerImg);
  hammer.x = Math.round(random(250,350));
  hammerGrp.add(hammer)
    hammer.velocityY = (3+score/100);
    hammer.lifetime = 200;
     hammer.scale = 0.1;

  }
}



