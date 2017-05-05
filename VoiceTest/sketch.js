var mic;
var pt1;
var pt2;

function setup() {
  cnv = createCanvas(600, 600);
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) /2;
  cnv.position(x, y);

  // Create an Audio input
  mic = new p5.AudioIn();
  background(0);
  //noFill();
  frameRate(100);
  
  pt1 = new p5.Vector(100, 0);

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(0, 2);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  //fill(127);
  stroke(255);

  // Draw an ellipse with height based on volume
  var r = map(vol, 0, 1, 100, 400);
  push();
  translate(width / 2, height / 2);

  pt2 = new p5.Vector(cos(frameCount / 50) * r, sin(frameCount / 50) * r);
   line(pt1.x, pt1.y, pt2.x, pt2.y);
  //ellipse(pt2.x, pt2.y, 1);
  pt1 = pt2;
  
  pop();
}
