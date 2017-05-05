var margin = 600;
var halfMargin = margin / 2;
var rMin = 10;
var rMax = 80;

function setup() {
  var cnv = createCanvas(margin, margin);
  var x = (windowWidth - margin) / 2;
  var y = (windowHeight - margin) / 2;
  cnv.position(x, y);
  frameRate(30);
  background(255);
  //noFill();
  //noStroke();
}
function draw() {

  var mouse = new p5.Vector(mouseX, mouseY);
  var radius = map(sin(frameCount*0.1), -1, 1, rMin, rMax);

  //var rotateAngle = map(sin(frameCount*0.11), -1, 1, -PI, PI);
  //console.log(rotateAngle);
  var move = new p5.Vector(cos(frameCount*0.11)*radius, sin(frameCount*0.11)*radius);

  var centerPt = p5.Vector.add(mouse, move);
  ellipse(centerPt.x, centerPt.y, radius*2);
  //ellipse(mouseX,mouseY,50);

}

function keyTyped() {
  if(key === 's') {
     saveCanvas('comicCirle-' +  month() + day() + hour() + minute(), 'jpg');
  }
}
