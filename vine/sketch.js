var margin = 600;
var halfMargin = margin / 2;
var radius = 16;
var nextVertex;
var index = 0;
var status;
var H;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  //var x = (windowWidth - margin) / 2;
  //var y = (windowHeight - margin) / 2;
  //cnv.position(x, y);
  frameRate(15);
  //colorMode(RGB, 100);
  stroke(255);
  //background(0);
}


function draw() {
  if(status == 1){
    hexagonal(nextVertex);
    //ellipse(nextVertex.x, nextVertex.y, 10, 10);
    index = floor(random(7));
    console.log(index);
    nextVertex = new p5.Vector(nextVertex.x+cos(PI/6+TWO_PI*index/6)*sqrt(3)*radius, nextVertex.y+sin(PI/6+TWO_PI*index/6)*sqrt(3)*radius);
  }
  nowColor = floor(random(6));
  if(nowColor == 0){
    H = 50 * floor(random(4));
  }
  
}


function mouseClicked(){
  
  var origin = new p5.Vector(mouseX - mouseX % (3*radius), mouseY- mouseY % (sqrt(3)*radius) );
  //var pt0 = origin;
  //var pt1 = new p5.Vector(origin.x + 3/2*radius, origin.y - sqrt(3)/2*radius );
  //var pt2 = new p5.Vector(origin.x, origin.y + sqrt(3)*radius);
  //var pt3 = new p5.Vector(pt3.x, pt3.y + sqrt(3)*radius);
  //var ary = [pt0, pt1, pt2, pt3];
  
  //var ary = [pt0, pt1, pt2, pt3];
  //var aryAnswer = ary.filter(function(i) {
  //  return  min();
  //  })
  //console.log(aryAnswer);
  
  
  
  var start = new p5.Vector(origin.x, origin.y);
  H = 50 * floor(random(4));
  hexagonal(start);

  index = floor(random(7));
  nextVertex = new p5.Vector(start.x+cos(PI/6+TWO_PI*index/6)*sqrt(3)*radius, start.y+sin(PI/6+TWO_PI*index/6)*sqrt(3)*radius);

  status = 1;
  return false;
}

function hexagonal(centerPt){
  fill(H, 100, 50);
  beginShape();
  for(i = 0; i<6; i++){
    vertex(centerPt.x+cos(TWO_PI*i/6)*radius, centerPt.y+sin(TWO_PI*i/6)*radius);
  }
  endShape(CLOSE);
}
  