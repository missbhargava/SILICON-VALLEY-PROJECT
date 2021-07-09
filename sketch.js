// variables
var bgImg;
var bgImg1;
var spaceshipImg;
var ship1;
var obstacleImg;
var lifeImg;
var life;
var backgr;
var bgImg2;
var bgImg3;

var obstacle;

var END =0;
var PLAY =1;
var INTRO=2;
var INTRO1=3;
var STAGE2=4;
var gameState =INTRO;

var attImg;
var attack;
var score=0;
var shipHealth=3; 
var astImg;
var mA=5;

//sound effects
var lifeSound,attackSound , winningSound,gameOverSound;





function preload(){
  // loading the images
  bgImg=loadImage("bg.png")
  bgImg1=loadImage("g.png")
  bgImg2=loadImage("bg2.png");

  spaceshipImg=loadImage("ship2.png")
  obstacleImg=loadImage("obs.png")
  attImg=loadImage("att.png");
  lifeImg=loadImage("powerup.png")
  astImg=loadImage("ast.png")
  bgImg3=loadImage("bgg.png");

// loading sounds
  lifeSound=loadSound("life.mp3");
  attackSound=loadSound("hurt.mp3");
  winningSound=loadSound("win.mp3");
  gameOverSound=loadSound("gameover.mp3");

}
function setup() {
  createCanvas(800,400);

  

  backgr=createSprite(555,0,800,400);
  backgr.addImage(bgImg3);
  backgr.scale=3.5;
  backgr.x=backgr.width/1;
  backgr.velocityY=5;



  ship1=createSprite(400,320,20,20);
  ship1.addImage(spaceshipImg);
  ship1.scale=0.6;


  // creating groups
  obstaclesGroup=createGroup();
  attackGroup=createGroup();
  lifeGroup=createGroup();
  astGroup=createGroup();

}

function draw() 
{
  background(bgImg);  

   fill(0);
   textSize(20);
   text(mouseX + "," + mouseY,mouseX,mouseY);

  

   ship1.depth=backgr.depth+1;

 if(gameState===INTRO){
   background(0);
   fill("yellow");
   textSize(20);
   text("Earth & humanity were facing its difficult times due to cosmic threats  ",140,150);
   text("& pollution on earth slowly the oxygen on earth was diminishing ",150,170);
   text("so it was decided to leave earth and search for a better place to live but... ",150,190);
   fill("red")
   text("Press C to continue ===>",200,220);
   if(keyDown("C")){
     gameState=1;
   }
 }

 if(gameState===mA){
   background(bgImg2);

   fill("black");
   textSize(55);
   text("Mission Accomplished",200,250);

   ship1.remove();
   winningSound.play().time(3);


 }

 

 if(gameState===STAGE2){
   background(bgImg2)

    spawnObstacles();
    spawnFire();
    spawnLife();
    spawnAst();

    fill("black");
    textSize(25);
    text("Ships Health="+shipHealth,40,50);
    text("Score "+score,650,50);
    textSize(20);
    text("Score Goal 20 ",670,70);
    textSize(20);
    text("Press A to attack",320,40); 

    
    if (keyDown(RIGHT_ARROW)){
      ship1.x+=5;
      
    }
    if (keyDown(LEFT_ARROW)){
      ship1.x-=5;
    } 

    if(ship1.isTouching(obstaclesGroup))
   {
      shipHealth-=2;
      obstaclesGroup.destroyEach();
     
   }
  
   if(ship1.isTouching(lifeGroup))
   {
      shipHealth+=1;
      lifeGroup.destroyEach();
   }




 }
   

  if(gameState===PLAY)
  {
    spawnObstacles();
    spawnFire();
    spawnLife();
    spawnAst();

    fill("black");
    textSize(25);
    text("Ships Health="+shipHealth,40,50);
    text("Score "+score,650,50);
    textSize(20);
    text("Score Goal 5 ",670,70);
    textSize(20);
    text("Press A to attack",320,40);    

    if (keyDown(RIGHT_ARROW)){
      ship1.x+=5;
      
    }
    if (keyDown(LEFT_ARROW)){
      ship1.x-=5;
    } 

  
  
   if(ship1.isTouching(obstaclesGroup))
   {
      shipHealth-=2;
      obstaclesGroup.destroyEach();
     
   }
  
   if(ship1.isTouching(lifeGroup))
   {
      shipHealth+=1;
      lifeGroup.destroyEach();
      lifeSound.play();
   }

   if(score>=5){
     gameState=4;
   }

   

  }
    if(score>=20){
      gameState=5;
    }

    if(shipHealth===4){
      shipHealth=3;
    }

  

   if(attackGroup.isTouching(obstaclesGroup))
    {
      obstaclesGroup.destroyEach();
      score+=2;
      attackSound.play();
    } 
    
    if(attackGroup.isTouching(astGroup))
    {
      astGroup.destroyEach();
      attackSound.play();
      score+=1;
    } 

    if(ship1.isTouching(astGroup))
    {
      astGroup.destroyEach();
      shipHealth-=1;
      
    } 
    
  

    if(shipHealth<=0){
      gameState=0;
    }

    // gameState END 
      if(gameState===END)
    {
      obstaclesGroup.destroyEach();
      background(bgImg1);
      
      //backgr.depth=obstacle.depth+1;

      obstaclesGroup.setVelocityYEach(0);
      
      //backgr.velocityY=0;
      //backgr.x=250;
     // backgr.y=250;
      //backgr.scale=0.5;

      ship1.remove();
      obstacle.visible=false;
      obstacle.velocityY = 0;
      gameOverSound.play().time(2);

    }

 
  drawSprites();
}



function spawnObstacles()
{
  if (frameCount %80 === 0)
  {
    obstacle = createSprite(40,52,22,22); 
    obstacle.x=random(30,800);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityY = 8;
    
    obstacle.lifetime = 250;
    obstacle.depth=ship1.depth+1;
    obstaclesGroup.add(obstacle);

  }
}

function spawnFire()
{
  if (keyWentDown("A"))
  {
    attack = createSprite(40,300,22,22); 
    attack.x=ship1.x;
    attack.addImage(attImg);
    attack.scale = 0.5;
    attack.velocityY = -3.5;
    
    attack.lifetime = 250;
    attack.depth=ship1.depth+1;
    attackGroup.add(attack);

  }
}


function spawnLife()
{
  if (frameCount %70 === 0)
  {
    life= createSprite(40,52,22,22); 
    life.x=random(30,800);
    life.addImage(lifeImg);
    life.scale = 0.2;
    life.velocityY = 8;
    
    life.lifetime = 250;
    life.depth=ship1.depth+1;
    lifeGroup.add(life);

  }
}


function spawnAst()
{
  if (frameCount %30 === 0)
  {
    ast= createSprite(40,52,22,22); 
    ast.x=random(30,800);
    ast.addImage(astImg);
    ast.scale = 0.1;
    ast.velocityY = 7;
    
    ast.lifetime = 250;
    ast.depth=ship1.depth+1;
    astGroup.add(ast);

  }
}
