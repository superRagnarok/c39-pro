
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var gameState = 1;

var ground;
var tree,tree_img;
var boy,boy_img;
var sun,sun_img;
var mango1,mango2,mango3,mango4,mango5,mango6;
var stone;
var sling;
var score = 0;
var highScore = score;
var reset, reset_img;
function preload()
{
	tree_img = loadImage("tree.png");
	boy_img = loadImage("boyx.png");
	sun_img = loadImage("sun.jpg");
    reset_img = loadImage("restart.webp");
}

function setup() {
	createCanvas(1000, 700);


	engine = Engine.create();
	world = engine.world;

	ground = new Ground(500,680,100,1000);
	tree = createSprite(730,420,5,5);
	tree.addImage(tree_img);
    tree.scale=0.4;
    sun = createSprite(75,70,5,5);
	sun.addImage(sun_img);
	sun.scale=0.16;
	boy = createSprite(200,567,5,5);
	boy.addImage(boy_img);
    boy.scale=0.16;
	reset = createSprite(500,500,80,80);
    reset.addImage(reset_img);
    reset.scale=0.1;
    reset.visible = false;

	mango1 = new Mango(800,300);
	mango2 = new Mango(750,260);
	mango3 = new Mango(700,350);
	mango4 = new Mango(660,250);
	mango5 = new Mango(600,330);
	mango6 = new Mango(850,355);

	stone = new Stone(165,545);
	 
	sling = new Slingshot(stone.body,{x:165, y:545});

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(255);
  textSize(30);
  fill("red");
  stroke("red");
  text("SCORE = "+score,800,100);
  ground.display();
  tree.display();
  sun.display();
  boy.display();
if (gameState === 1){
    text("Play by Dragging the stone",100,50);
    reset.visible = false;
}
if (gameState === 0){
    textSize(50);
    text("GAME OVER",300,350);
    text("Press Ctrl+R to play Again",200,200);
    reset.visible = true;
    if (score < 3){
        text("Better Luck Next Time",200,500);
    } else{
        text("Well Played",300,500);
    }


}
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display(); 
  detectCollision(mango1,stone);
  detectCollision(mango2,stone);
  detectCollision(mango3,stone);
  detectCollision(mango4,stone);
  detectCollision(mango5,stone);
  detectCollision(mango6,stone);
  stone.display();
  fill("black");
  sling.display();

  /*if (keyDown("space")){
    gameState = 1;
    sling.attach(stone.body);
}*?


  
  detectColliding(ground,mango1);
  detectColliding(ground,mango2);
  detectColliding(ground,mango3);
  detectColliding(ground,mango4);
  detectColliding(ground,mango5);
  detectColliding(ground,mango6);
/*if (Matter.Body.setStatic(mango3.body,false)){
    score = score +1;
}*/
  /*if (mango1.body.position.y>300){
      score = score+1;
  }
  if (mango2.body.position.y>260){
    score = score+1;
}
if (mango3.body.position.y>350){
    score = score+1;
}
if (mango4.body.position.y>250){
    score = score+1;
}
if (mango5.body.position.y>330){
    score = score+1;
}
if (mango6.body.position.y>355){
    score = score+1;
}*/
}
function mouseDragged(){
    if (stone.body.position.x<180 && gameState === 1){
    Matter.Body.setPosition(stone.body,{x: mouseX, y: mouseY});
    }
}
function mouseReleased(){
sling.fly();
gameState = 0;

}
function detectCollision(mango,stone){
mangoBodyPostion=mango.body.position;
stoneBodyPosition=stone.body.position;

var distance=dist(stoneBodyPosition.x,stoneBodyPosition.y,mangoBodyPostion.x,mangoBodyPostion.y);
if (distance<=mango.r+stone.r){
	Matter.Body.setStatic(mango.body,false);
    score = score+1;
    
}
}
function detectColliding(ground,mango){
    mangoBodyPosition=mango.body.position;
    groundBodyPosition=ground.body.position;
    
    var distance=dist(mangoBodyPosition.x,mangoBodyPosition.y,groundBodyPosition.x,groundBodyPosition.y);
    if (distance<=ground.r+mango.r){
        //Matter.Body.setStatic(mango.body,false);
        score = score+1;
    }
    }