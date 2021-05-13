var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_stop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage =loadImage("background.jpg")
  monkey_stop=loadImage("sprite_0.png")
}



function setup() {
  createCanvas(600,450);
  background=createSprite(200,200,600,600)
  background.scale=0.8
  background.addImage(backgroundImage)
  monkey=createSprite(50,360)
  monkey.addAnimation("monkey", monkey_running)
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale=0.2
  ground=createSprite(300,400,600,20)
  ground.visible=false
  foodGroup = new Group();
  obstacleGroup = new Group();
  
   monkey.setCollider("circle",60,0,200);
 //monkey.debug = true;
   survivalTime=0
}


function draw() {

  if(gameState ===PLAY){
     background.velocityX = -4;
  if (background.x < 100){
  background.x = background.width/4;
  }
     
     if(keyDown("space") && monkey.y > 325){
    monkey.velocityY = -20;
      }
    survivalTime = survivalTime+Math.round(getFrameRate()/60);
     monkey.velocityY = monkey.velocityY + 0.8;
    
     food();
  obstacles()
    if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
  }
     if (obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  }
  if (gameState === END){
     ground.velocityX = 0;
    monkey.velocityY = 0;
     background.velocityX =0;
     obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
     score=0
     monkey.changeAnimation("stop",monkey_stop);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }

monkey.collide(ground)
drawSprites();
fill("white")
textSize(20);
text("SurvivalTime: "+ survivalTime,200,50);
}
function food (){
  if (frameCount % 80 === 0){
  banana = createSprite(500,Math.round(random(180,240)),10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.15;
  banana.velocityX = -5;
  banana.lifetime = 600;
  foodGroup.add(banana);
  }
}
function obstacles(){
  if (frameCount % 120 === 0){
  obstacle = createSprite(Math.round(random(200,200)),380,20,10);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -5;
  obstacle.lifetime = 600;
  obstacleGroup.add(obstacle);
  }
}
