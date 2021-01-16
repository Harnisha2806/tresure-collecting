var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var bell;

var oppPink,oppPinkImage,PinkCG ,player1;
var oppRed , oppRedImage,RedCG, player2;
var oppYellow, oppYellowImage,YellowCG, player3;

var obs, obs1 , obs2 , obs3 , obsGroup;

var gameover, gameoverImg;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1=                                                 loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("mainPlayer3.png");
  oppPinkImage=loadAnimation("opponent1.png","opponent2.png");
  oppPinkfall=loadImage("opponent3.png");
  oppRedImage= loadAnimation("opponent4.png","opponent5.png");
  oppRedfall=loadImage("opponent6.png");
  oppYellowImage=loadAnimation("opponent7.png","opponent8.png");
  oppYellowfall=loadImage("opponent9.png");
  
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  
  bell=loadSound("sound/bell.mp3");
  gameoverImg=loadImage("gameOver.png");
  
}

function setup(){
  
createCanvas(1000,300);
  
// Moving background
path=createSprite(1000,150);
path.addImage(pathImg);


//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.068;
  
PinkCG = new Group();
RedCG = new Group();
YellowCG = new Group();  
  
obsGroup = new Group();  
  
 mainCyclist.setCollider("rectangle",0,0,mainCyclist.width/2,mainCyclist.
height/2) ;
 
  gameover = createSprite(350,150,20,20);
  gameover.addImage(gameoverImg);
  gameover.scale = 1.5;
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
    
  if(gameState===PLAY){ 
 //adding bell sound    
  if(keyDown("space")){
    bell.play();
  }
 
    gameover.visible=false;
    
 //adding movement to cyclists
  mainCyclist.y = World.mouseY;
  edges= createEdgeSprites();
  mainCyclist .collide(edges);
    
 //calculating the distance   
 distance= distance + Math.round(getFrameRate()/50);  
    
//velocity to path  
 path.velocityX = -(5+2*Math.round(distance/200));
    
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;}
    

    
    
// creating continous opponents 
    var sellect_opponentPlayer = Math.round(random(1,4));
 if (World.frameCount % 150===0) {
  switch (sellect_opponentPlayer){
    case 1:pinkCyclists();
      break;
    case 2:redCyclists();
      break;
    case 3:yellowCyclists();  
      break;
    case 4:obstacles(); 
      break;
      default:break; 
  }  
 }
  
if(PinkCG.isTouching(mainCyclist) || RedCG.isTouching(mainCyclist) || YellowCG.isTouching(mainCyclist) ||
   obsGroup.isTouching(mainCyclist)) {
  gameState=END; 
}   
}
  if (gameState===END){
    PinkCG.setVelocityEach(0,0);
    RedCG.setVelocityEach(0,0);
    YellowCG.setVelocityEach(0,0);
    obsGroup.setVelocityEach(0,0);
    
    PinkCG.setLifetimeEach(-1);
    RedCG.setLifetimeEach(-1);
    YellowCG.setLifetimeEach(-1);
    obsGroup.setLifetimeEach(-1);
    
    path.velocityX=0;
    mainCyclist.velocityY=0;
    
    gameover.visible=true;
    
    mainCyclist.addImage("stop",mainRacerImg2);
    fill("cayn");
    text("PRESS UP TO RESTAR THE GAME",200,220);
    
    if(keyWentDown("up")){
      reset();
      
    }
  }
}

function pinkCyclists(){
  player1 = createSprite(600,Math.round(random(20,250)),10,10);
  player1.scale=0.06;
  player1.addAnimation("opponentPlayer1",oppPinkImage);
  player1.setLifetime=170;
  PinkCG.add(player1);
  player1.velocityX= -(6+2*Math.round(distance/200));
  player1.depth=gameover.depth;
  gameover.depth= gameover.depth+1;
}
  
function redCyclists(){
  player2 = createSprite(600,Math.round(random(20,250)),10,10);
  player2.scale=0.06;
  player2.addAnimation("opponentPlayer2",oppRedImage);
  player2.setLifetime=170; 
  RedCG.add(player2);
  player2.velocityX= -(6+2*Math.round(distance/200));
   player2.depth=gameover.depth;
  gameover.depth= gameover.depth+1;
}

function yellowCyclists(){
  player3 = createSprite(800,Math.round(random(20,270)),10,10);
  player3.scale=0.06;
  player3.addAnimation("opponentPlayer3",oppYellowImage);
  player3.setLifetime=170; 
  YellowCG.add(player3);
 player3.velocityX= -(6+2*Math.round(distance/200));
   player3.depth=gameover.depth;
  gameover.depth= gameover.depth+1;
}

function obstacles(){
  if(World.frameCount % 150 === 0 ){
 obs = createSprite(700,Math.round(random(30,270)),10,10);
 obs.scale=0.09;
 obs.velocityX= -(5+2*Math.round(distance/300));  
 obs.lifetime= 170;   
 var rand=Math.round(random(1,3));
    switch (rand){
    case 1: obs.addImage(obs1);
        break;
    case 2: obs.addImage(obs2);
        break;
    case 3: obs.addImage(obs3);
        break;
    default:break;    
    }
  obs.depth=gameover.depth;
  gameover.depth= gameover.depth+1;
    
   obsGroup.add(obs); 
    
  }
}

function reset(){
  gameState=PLAY;
  gameover.visible=false;
  
  PinkCG.destroyEach();
  RedCG.destroyEach();
  YellowCG.destroyEach();
  obsGroup.destroyEach();
  distance=0;
}


