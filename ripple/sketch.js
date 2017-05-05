var margin = 600;
var num = 30;
var halfMargin = margin / 2;
var dotDis = margin / num;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSL, 100);

}

function draw() {
  var startPtX = width / 2 - halfMargin;
  var startPtY = height / 2 - halfMargin;

  translate(startPtX, startPtY);
  background(0);
  for (var i = 0; i < num; i ++){
  	for (var j = 0; j < num; j ++){
  		var locX = dotDis * i;
  		var locY = dotDis * j;

  		var frameTime = frameCount * 0.15;
  		var ampA = 1;
  		var ampB = 1;
  		var mirrorX = windowWidth - touchX;

  		var recDisA = Math.sin(dist(locX, locY, touchX - startPtX, touchY - startPtY) / 50 - frameTime) * ampA;
  		var recDisB = Math.sin(dist(locX, locY, mirrorX - startPtX, touchY - startPtY) / 50 - frameTime) * ampB;
  		//var recDis = max(recDisA, recDisB);
  		var recDis = recDisA + recDisB;
      var recSize = map(recDis, (ampA+ampB)/10, 0, 1, 0);
      push();

      translate(locX, locY);
      //rotate(Math.sin(frameCount * 0.1));
      fill(map(recSize, -10, 10, 50, 100), 100, 50);
      rect(0, 0, recSize, recSize);
      pop();

      fill(100);
      // ellipse(mirrorX - startPtX, touchY - startPtY, 10)
    }
  }
}

function keyTyped() {
  if(key === 's') {
     saveCanvas('ripple-' +  month() + day() + hour() + minute(), 'jpg');
  }
}
