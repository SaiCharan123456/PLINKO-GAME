var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var particle;

var divisionHeight=200;
var score =0;
var count = 0;
var gameState = "start";

function setup() {
  createCanvas(1000, 640);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <1000; k = k + 100) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //create 1st row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,275));
  }
  
  //create 4th row of plinko objects
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

  //create particle objects
  particle = new Particle(random(20,780),50,15);
    
}
 


function draw() {
  background("black");
  textSize(20);
  fill("white");
  text("SCORE : "+score,20,40);
 
  textSize(20);
  fill("white");
  text(mouseX+","+mouseY,mouseX,mouseY); 

  textSize(20);
  fill("orange");
  text("10000000",505 ,530);
  text("10000000",405 ,530);
  textSize(23);
  fill("red");
  text("1000000",605 ,530);
  text("1000000",305 ,530);
  textSize(25);
  fill("blue");
  text("100000",807 ,530);
  text("100000",107 ,530);
  textSize(30);
  fill("yellow");
  text("10000",910 ,530);
  text("10000",7 ,530);
  Engine.update(engine);
  ground.display();
  
  if ( gameState =="launch"){
    background("black");
  textSize(100);
  fill("yellow");
  text("YOU WIN : "+score,20,300);  
  
  textSize(70);
  fill("yellow");
  text("press space to restart the game",10,400); 
  
  if(keyCode === 32 && gameState==="launch"){
    gameState="restart";
  }
 } 

 if ( gameState =="end"){
  background("black");
textSize(100);
fill("yellow");
text("YOU LOST",20,300); 

  textSize(70);
  fill("yellow");
  text("press space to restart the game",10,400);

  if(keyCode === 32 && gameState==="end"){
    gameState="restart";
  }
} 

if(gameState ==="restart"){
  score = 0;
  count = 0;
  particle!=null;
  gameState="start";
  //gameState!="launch";
}
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
   for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
  


 //particle.display();
 if(particle!== null){
  particle.display();

   if(particle.body.position.y>600){

    if(particle.body.position.x < 100 || particle.body.position.x > 910){
      score = score + 10000;
      particle = null;
      if (count>=5) gameState ="launch";
    }
    else if(particle.body.position.x < 200 || particle.body.position.x > 810 ){
      score = score + 100000;
      particle = null;
      if (count>=5) gameState ="launch";
    }
    else if(particle.body.position.x < 400 || particle.body.position.x > 610 ){
      score = score + 1000000;
      particle = null;
      if (count>=5) gameState ="launch";
    }
    else if(particle.body.position.x > 410 || particle.body.position.x < 600 ){
      score = score + 10000000;
      particle = null;
      if (count>=5) gameState ="launch";
    }
    else if(particle.body.position.x < 312 || particle.body.position.x > 700 ){
      score = 0;
      particle = null;
      gameState ="end";
    }
  }
 }

}

  
function mousePressed(){
 if(gameState!=="launch"){
   count++;
   particle = new Particle(mouseX,50,15);
  }
}
