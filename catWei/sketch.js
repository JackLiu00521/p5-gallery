var ctracker;
var w = 400;
var h = 300;
var duration = 0;


function dotDrawer(pt1, pt2, num) {
  this.pt1 = pt1;
  this.pt2 = pt2;
  this.num = num;
  this.pts = [];
  for(i = 0; i < this.num; i++) {
    var curPt = new p5.Vector(this.pt1.x * i/this.num + this.pt2.x * (this.num-i)/this.num, this.pt1.y * i/this.num + this.pt2.y * (this.num-i)/this.num);
    this.pts.push(curPt);
  }
}
  
function catEar(x, y) {
  this.x = x;
  this.y = y;
  this.num = 4;
  this.r = 25;
  this.pt1 = new p5.Vector(x + this.r*cos(PI * 5/ 6), y + this.r*sin(PI * 5/ 6));
  this.pt2 = new p5.Vector(x + this.r*cos(-PI / 2), y + this.r*sin(-PI / 2));
  this.pt3 = new p5.Vector(x + this.r*cos(PI * 1/6), y + this.r*sin(PI * 1/6));
  this.catEarPt = [this.pt1,this.pt2,this.pt3];
  
  var roll1 = new dotDrawer(this.pt1, this.pt2, 4);
  var roll2 = new dotDrawer(this.pt2, this.pt3, 4);
  
  this.catEarPt = this.catEarPt.concat(roll1.pts, roll2.pts);
  
}

function hair(ptNose, ptFace) {
  this.midPt = new p5.Vector( (ptNose[0]+ptFace[0])/2, (ptNose[1]+ptFace[1])/2 );
  this.ptNose_ptFaceM = new p5.Vector(ptFace[0]-ptNose[0], ptFace[1]-ptNose[1]);
  this.ptNose_ptFaceM.setMag(50);
  this.endPt = new p5.Vector(this.midPt.x + this.ptNose_ptFaceM.x, this.midPt.y + this.ptNose_ptFaceM.y);
  var dotLine = new dotDrawer(this.midPt, this.endPt, 4);
  for(i=0; i<dotLine.pts.length; i++){
    ellipse(dotLine.pts[i].x, dotLine.pts[i].y, 6, 6);
  }
}


function setup() {
  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.size(w, h);
  var posX = (windowWidth - w) / 2;
  var posY = (windowHeight - h) / 2;
  videoInput.position(posX, posY);
  
  // setup canvas
  var cnv = createCanvas(w, h);
  cnv.position(posX, posY);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  
  noStroke();
  colorMode(HSL, 100);
}

function draw() {
  clear();
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  
  /*for (var i=0; i<positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    // draw ellipse at each position point
    var val = 20;
    ellipse(positions[i][0], positions[i][1], val, val);
  }*/
  var clown = new nose();
  
  if(boolean(positions)){
    duration += 1;
    
    var left = new catEar(positions[20][0] - 10, positions[20][1] - 60);
    var right = new catEar(positions[16][0] + 10, positions[16][1] - 60);
  
    for(i=0; i < left.catEarPt.length; i++) {
      push();
      translate(left.x, left.y);
      rotate(- PI / 8);
      translate(-left.x, -left.y);
      ellipse(left.catEarPt[i].x, left.catEarPt[i].y, 6, 6);
      pop();
    }
    for(i=0; i < right.catEarPt.length; i++) {
      push();
      translate(right.x, right.y);
      rotate(PI / 8);
      translate(-right.x, -right.y);
      ellipse(right.catEarPt[i].x, right.catEarPt[i].y, 6, 6);
      pop();
    }
  
    new hair(positions[40], positions[13]);
    new hair(positions[39], positions[12]);
    new hair(positions[38], positions[11]);
    
    new hair(positions[34], positions[1]);
    new hair(positions[35], positions[2]);
    new hair(positions[36], positions[3]);
    
    clown.update(positions[62][0], positions[62][1]);
    clown.display();
  }
  else {
    duration = 0;
    clown.origin();
  }
}

function keyTyped() {
  if(key === 's') {
     saveCanvas('cat-' +  month() + day() + hour() + minute(), 'jpg');
  }
}