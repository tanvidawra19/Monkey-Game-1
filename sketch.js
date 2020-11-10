var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(40,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale= 0.1;
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  console.log(ground.x);
  
  foodGroup=new Group();
  obstaclesGroup= new Group();
  
}


function draw() {
  
  background ("white");
  
  stroke("white");
  textSize(20);
  fill("white");
  

   if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
   } 
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
     
   if(ground.x<0) {
    ground.x=ground.width/2;
  }  
  
  spawnObstacles();
  banana();
  drawSprites();
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  }
     stroke("black");
  textSize(20);
  fill("black");
  survivalTime= Math.ceil(frameCount/ frameRate());
  text("Survival Time: "+ survivalTime,100,20);
  


}

function spawnObstacles(){
  if(frameCount % 300===0){
    var obstacle = createSprite(600,330,10,40);
    obstacle.velocityX= -6;
    obstacle.addImage(obstaceImage);
    obstaclesGroup.add(obstacle);
    obstacle.scale=0.1;
    obstacle.lifetime = 100;
   
  }
}

function banana(){
  if(frameCount % 80===0){
    var food = createSprite(600,250,40,10);
    food.y= Math.round(random(20,200));
    food.velocityX= -4;
    food.addImage(bananaImage);
    foodGroup.add(food);
    food.scale=0.1; 
   food.lifetime = 150;
  }
}