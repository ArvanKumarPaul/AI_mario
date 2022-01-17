img = "";
noseX = "";
noseY = "";
MarioX = "325";
MarioY = "325";
GameStatus = "";

function preload() {
	world_start = loadSound("world_start.wav");
	setSprites();
	MarioAnimation();
}

function setup() {

	canvas = createCanvas(1240,336);
	canvas.parent("#myCanvas");
	video = createCapture(VIDEO);
	video.size(600,400);
	video.parent("gaming_console");
	instializeInSetup(mario);
	poseNet = ml5.poseNet(video,modelLoaded);
	poseNet.on('pose',gotPoses);

}

function game() {

  initializeInDraw();
  moveEnvironment(mario);
  drawSprites();
  console.log("Nose X = "+noseX+" Nose Y = "+noseY);

}

function draw() {

	game();

	if(noseX > 300) {

      MarioX = MarioX + 1;

	}

	image(img,MarioX,MarioY,30,60);

	if(noseX < 300) {

		MarioX = MarioX - 1;
  
	}

    image(img,MarioX,MarioY,30,60);

	if(noseY < 150) {

		MarioY = MarioY - 1;
  
	}

    image(img,MarioX,MarioY,30,60);
  
}

function modelLoaded() {

  console.log("Model Loaded!");

}

function gotResults(results) {

  if(results.length>0) {

    noseX = results[0].pose.nose.x;
	noseY=  results[0].pose.nose.y;
	
	console.log("Nose X = "+noseX+" Nose Y = "+noseY);

  }

}

function startGame() {

  GameStatus = "start";
  document.getElementById("status").innerHTML = "Game is Loading";
  world_start.play();

}