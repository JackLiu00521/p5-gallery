var pta;
var ptb;
var ra = 120;
var rb = 40;
var rCan = 100;
var drawPtL = 100;
var drawPt;
var params = {};

var fileCount = 0;

function setup() {
  cnv = createCanvas(600, 600);
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) /2;
  cnv.position(x, y);
  background(0);
  stroke(255);
  noFill();
  frameRate(100);
  
  params = {
  ptaCenterX: random(150, width-150),
  ptaCenterY: random(150, height-150),
  ptbCenterX: random(150, width-150),
  ptbCenterY: random(150, height-150),
  }
}

function draw() {
  // background(0);
  
  var speed = frameCount * params.speed;
  var speeda = speed / ra;
  var speedb = speed / rb;
  var speedCan = speed / rCan;
  
  pta = new p5.Vector(params.ptaCenterX + cos(speeda) * ra, params.ptaCenterY + sin(speeda) * ra);
  ptb = new p5.Vector(params.ptbCenterX + cos(speedb) * rb, params.ptbCenterY + sin(speedb) * rb);
  
  var lineM = new p5.Vector(pta.x - ptb.x, pta.y - ptb.y);
  var drawPtM = new p5.Vector(ptb.y - pta.y, pta.x - ptb.x);
  
  var midPt = p5.Vector.add(pta, ptb);
  midPt = p5.Vector.div(midPt, 2);
  
  drawPt = drawPtM.setMag(drawPtL);
  drawPt.add(midPt);
  
  /*line(pta.x, pta.y, ptb.x, ptb.y);
  ellipse(params.ptaCenterX, params.ptaCenterY, 2 * ra);
  ellipse(params.ptbCenterX, params.ptbCenterY, 2 * rb);
  line(drawPt.x, drawPt.y, midPt.x, midPt.y);*/
  
  // point(drawPt.x, drawPt.y);
  
  push();
  translate(width/2, height/2);
  rotate(speedCan * PI);
  translate( -width/2, -height/2);
  point(drawPt.x, drawPt.y);
  stroke(255,0,0);
  point(midPt.x, midPt.y);
  stroke(255);
  /*line(pta.x, pta.y, ptb.x, ptb.y);
  ellipse(params.ptaCenterX, params.ptaCenterY, 2 * ra);
  ellipse(params.ptbCenterX, params.ptbCenterY, 2 * rb);
  line(drawPt.x, drawPt.y, midPt.x, midPt.y);*/
  pop();
}

function keyTyped() {
  if (key === 'u') {
    background(0);
  }
   else if(key === 's'){
    saveCanvas('mec-' + month() + day() + hour() + minute(), 'jpg');
    // console.log('mec-' + month() + day() + "_"+ hour() + ":" + minute(), 'jpg');
     fileCount += 1;
  }
}


window.onload = function() {
  var gui = new dat.GUI();
  gui.add(params, 'ptaCenterX', 0, width);
  gui.add(params, 'ptaCenterY', 0, height);
  gui.add(params, 'ptbCenterX', 0, width);
  gui.add(params, 'ptbCenterY', 0, height);
  gui.add(params, 'speed', 0.01, 5);
};