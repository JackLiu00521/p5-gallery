/* function to-do list: 
1.speed rpm display  2.redraw without refresh params 3.drawPt fade
4.adjust pta-ptm ptm-ptd length 5.rotate canvas itself
*/
var canvW = 600;
var canvH = 600;
var fr = 60;
var params = {};
var pts = [];
var pta, ptb;
var disGearsStatus = false

var datParams = {
  ptaCenterX: Math.floor((Math.random() * canvW) + 1),
  ptaCenterY: Math.floor((Math.random() * canvH) + 1),
  ra: 130,
  ptbCenterX: Math.floor((Math.random() * canvW) + 1),
  ptbCenterY: Math.floor((Math.random() * canvH) + 1),
  rb: 40,
  rCan: 100,
  pta_ptmL: 200,
  ptm_ptdL: 100, 
  speedCanvas_rpm: 0.3,
}

var datFunctions = {
  displayGears: function() {
    if(disGearsStatus === false){
      disGearsStatus = true;
    } else {
      disGearsStatus = false;
    }
  }
}

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(datParams, 'ptaCenterX', 0, canvW);
  gui.add(datParams, 'ptaCenterY', 0, canvH);
  gui.add(datParams, 'ptbCenterX', 0, canvW);
  gui.add(datParams, 'ptbCenterY', 0, canvH);
  gui.add(datParams, 'speedCanvas_rpm', 0.05, 3);
  gui.add(datFunctions, 'displayGears');
}

function setup(){
  cnv = createCanvas(600, 600);
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) /2;
  cnv.position(x, y);
  background(0);
  frameRate(fr);
  stroke(255);
  noFill();
}

function draw(){
  background(0);
  params = {
    // time(sec) = frameCount / frameRate
    speedCan: function(fc){return datParams.speedCanvas_rpm * TWO_PI * fc / fr },
    speeda: function(fc){return this.speedCan(fc) * datParams.rCan / datParams.ra},
    speedb: function(fc){return this.speedCan(fc) * datParams.rCan / datParams.rb},
  }
  pta = new p5.Vector(datParams.ptaCenterX + cos(params.speeda(frameCount)) * datParams.ra, datParams.ptaCenterY + sin(params.speeda(frameCount)) * datParams.ra);
  ptb = new p5.Vector(datParams.ptbCenterX + cos(params.speedb(frameCount)) * datParams.rb, datParams.ptbCenterY + sin(params.speedb(frameCount)) * datParams.rb);
  
  var lineM = new p5.Vector(ptb.x - pta.x, ptb.y - pta.y);
  var drawPtM = new p5.Vector(ptb.y - pta.y, pta.x - ptb.x);
  
  var midPt = p5.Vector.add( lineM.setMag(datParams.pta_ptmL), pta );
  var drawPt = p5.Vector.add( drawPtM.setMag(datParams.ptm_ptdL), midPt);

  /*append(pts, drawPt);
  
  for(i = 0; i < pts.length; i++){
    push();
    translate(width/2, height/2);
    rotate(params.speedCan(i));
    translate( -width/2, -height/2);
    point(pts[i].x, pts[i].y);
    // console.log(pts[i]);
    pop();
  }*/
    
    if(disGearsStatus === true){
      // push();
      // translate(width/2, height/2);
      // rotate(params.speedCan(frameCount));
      // translate( -width/2, -height/2);
      
      ellipse(datParams.ptaCenterX, datParams.ptaCenterY, datParams.ra*2);
      ellipse(datParams.ptbCenterX, datParams.ptbCenterY, datParams.rb*2);
      line(pta.x, pta.y, ptb.x, ptb.y);
      line(midPt.x, midPt.y, drawPt.x, drawPt.y);
      // pop();
  }
}