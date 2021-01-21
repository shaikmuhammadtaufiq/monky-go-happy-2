var monkey;

var mon;

var monke;

var banana;

var stone;

var back;

var ground;

var serve=0;

var play=1;

var end=2;

gamestate=0;

var banana1=0;

var score=0;

var tries=0;

var life=2;

var monkeysound;

function preload(){
  
monkeyimage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
 
monimage=loadImage("Monkey_06.png")   
  
monkeimage=loadImage("Monkey_05.png") 
  
bananaimage=loadImage("Banana.png");
                      
stoneimage=loadImage("stone.png");
  
backimage=loadImage("jungle.jpg");
  
  
//monksound=loadSound("monkey.mp3")

}

function setup(){
  
createCanvas(700,400);
  
back=createSprite(200,50,10,10);
back.addAnimation("back",backimage);
back.scale=1.4
back.x=back.width/2;
  
monk=createSprite(70,300,10,10);
monk.addAnimation("running",monkeyimage);
monk.scale=0.12;
  
invisible=createSprite(350,330,700,10);
invisible.visible=false;  
  
bananaGroup=createGroup();
  
stone1Group=createGroup();
 
}

function draw(){
  
  background("white");
 
  monk.collide(invisible);
  
  console.log(monk.scale)
 
  if(gamestate==0){ 
    
    monk.visible=true;
    
    back.velocityX=0;
    
    monk.scale=0.12;
    
    monk.y=300;

    drawSprites();
    
    textSize(49);
    fill("red");
    text("PRESS ENTER TO START",30,200)
    
    textSize(49);
    fill("red");
    text("YOU HAVE 2 LIVES",100,250) 
  
  
  if(keyDown("ENTER") && gamestate==0){
  gamestate=1;
     }
  }
  
  if(monk.isTouching(bananaGroup)){
banana1=banana1+1;
bananaGroup.destroyEach();
} 
  
  if(gamestate==1){
    
monk.changeAnimation("running",monkeyimage);
    
back.velocityX=-8
  
if(keyDown("space")&& monk.y>277){
monk.velocityY=-12;
}

monk.velocityY=monk.velocityY+0.5;
  
if(back.x<0){
 back.x=back.width/2; 
}
    
score=score+3*Math.round(World.frameRate/60);
  
  food();
  
  stone1();
    
     switch(banana1){
        
         case 10:monk.scale=0.125;
         break;
         case 20:monk.scale=0.13;
         break;
         case 30:monk.scale=0.135;
         break;
         case 40:monk.scale=0.14;
         break;
         case 50:monk.scale=0.145;
         break;
         case 60:monk.scale=0.15;
         break;
         case 100:monk.scale=0.155;
         break;
      
         default:break;       
     
  }
    
  drawSprites();
    
  textSize(20);
  fill("red");
  text("SCORE:"+score,450,30);
    
  textSize(20);
  fill("red");
  text("BANANA:"+ banana1,450,55);    
    
}

  if(monk.isTouching(stone1Group)){
    monk.y=150;
    life=life-1;
    monk.scale=0.09;
    tries=tries+1;
    stone1Group.setVelocityEach=0;
    stone1Group.destroyEach();
    bananaGroup.destroyEach();
  }
  
  
  if(tries==2){
    gamestate=end;
  }
  
  if(gamestate==end){
    reset();
  textSize(20);
  fill("red");
  text("SCORE:0",450,30);
  
  textSize(20);
  fill("red");
  text("BANANA:0",450,55);    
    
  }
  
  textSize(20);
  fill("red");
  text("LIVES : "+life,40,20);
  
 if(keyDown("r")){
   
   gamestate=0;
   stone1Group.destroyEach();
   bananaGroup.destroyEach();
   life=2;
   
 }
  
}

function reset(){
  
score=0;  
banana1=0;
tries=0;
back.velocityX=0;
stone1Group.setLifetimeEach(-1);
stone1Group.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
bananaGroup.setLifetimeEach(-1);
monk.collide(stone1Group);
monk.visible=false;
drawSprites();
textSize(40);
fill("red");
text("YOU LOSE",160,150)
text("PRESS R TO RESTART",80,200);
}

function food(){

  if(frameCount%120==0){
  banana=createSprite(700,700,10,10);
  banana.addAnimation("food",bananaimage);
  banana.scale=0.04
  banana.velocityX=-8;
  var rand=Math.round(random(130,180));
  banana.y=rand; 
  banana.setLifetime=300
  bananaGroup.add(banana);
  }
}

function stone1(){
  
 if(frameCount%180==0){ 
   
var stone1=createSprite(600,290,10,10);
stone1.addAnimation("stone.png",stoneimage);
stone1.scale=0.3
stone1.velocityX=-8;
stone1.setCollider("circle",0,0,170);
stone1.setLifetime=300
stone1Group.add(stone1);  
   
 } 
}

