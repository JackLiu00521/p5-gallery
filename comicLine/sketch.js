var margin = 600;
var halfMargin = margin / 2;

function setup() {
  var cnv = createCanvas(margin, margin);
  var x = (windowWidth - margin) / 2;
  var y = (windowHeight - margin) / 2;
  cnv.position(x, y);
  frameRate(30);
  background(255);
  //noStroke();
}

function draw() {
  //background(255);
  var pt1 = randomPt();
  console.log(pt1);
  var mouse = new p5.Vector(mouseX, mouseY);
  var move = p5.Vector.sub(mouse, pt1);
  var pt2 = p5.Vector.add(mouse, move);
  stroke(3);
  line(pt1.x, pt1.y, pt2.x, pt2.y);
}


function randomPt(){
  var ptX = random(-10000, 10000);
  var ptY = random(-10000, 10000);
  return new p5.Vector(ptX,ptY);
}

function keyTyped() {
  if(key === 's') {
     saveCanvas('comicLine-' +  month() + day() + hour() + minute(), 'jpg');
  }
}
