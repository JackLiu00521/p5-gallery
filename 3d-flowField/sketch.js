var datParams = {};
var flowField;
var debug = false;
var vehicles = [];
var boxPt = [];
var zDepth = 800;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	flowField = new FlowField(40);
	
	datParams = {
    x: width/2,
    y: height/2,
    z: 500,
    rX: 0,
    rY: 0,
    rZ: 0,
  };
  
  datParams.reset = function() {this.x = width/2; this.y = height/2; this.z = 1000; this.rX = 0; this.rY = 0; this.rZ = 0}
  
  boxPt = [
      new p5.Vector(0,0,-500),
      new p5.Vector(width,0,-500),
      new p5.Vector(width,height,-500),
      new p5.Vector(0,height,-500),
      new p5.Vector(0,0,zDepth+1000),
      new p5.Vector(width,0,zDepth+1000),
      new p5.Vector(width, height,zDepth+1000),
      new p5.Vector(0,height,zDepth+1000),
  ];
	
	for (var i = 0; i < 150; i++) {
    vehicles.push(new Vehicle(random(width), random(height), random(zDepth), random(2, 5), random(0.5, 1.5), random(15, 70)));
  }
}

function draw() {
  // orbitControl()
  
  datParams.z = (map(mouseY, 0, height, 250, 800));
  datParams.rY = (map(mouseX, 0, width, -PI/5, PI/5));
  
  
  var fov = 70 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(fov, width/height, cameraZ * 0.1, cameraZ * 10);
  
  camera(datParams.x, datParams.y, datParams.z);
  
  translate(width/2, height/2, zDepth/2);
  rotateX(datParams.rX);
  rotateY(datParams.rY);
  rotateZ(datParams.rZ);
  translate(-width/2, -height/2, -zDepth/2);
  if (debug) {flowField.display();}
  
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowField);
    vehicles[i].run();
  }
  drawGridBox();
}


function keyTyped() {
  if (key == ' ') {
    flowField.init();
  }
}

function mousePressed() {
  // flowField.state = !flowField.state;
  flowField.init();
}


function drawCrossGrid(a, b, c, d) {
  beginShape();
  vertex(a.x, a.y, a.z);
  vertex(b.x, b.y, b.z);
  vertex(c.x, c.y, c.z);
  vertex(d.x, d.y, d.z);
  endShape(CLOSE);
  // beginShape();
  // vertex(a.x, a.y, a.z);
  // vertex(c.x, c.y, c.z);
  // endShape();
  
  // beginShape();
  // vertex(b.x, b.y, b.z);
  // vertex(d.x, d.y, d.z);
  // endShape();
}

function drawGridBox() {
  fill(180);
  drawCrossGrid(boxPt[0], boxPt[1], boxPt[2], boxPt[3]);
  // drawCrossGrid(boxPt[4], boxPt[5], boxPt[6], boxPt[7]);
  // drawCrossGrid(boxPt[0], boxPt[1], boxPt[5], boxPt[4]);
  // drawCrossGrid(boxPt[3], boxPt[2], boxPt[6], boxPt[7]);
  // drawCrossGrid(boxPt[2], boxPt[1], boxPt[5], boxPt[6]);
  // drawCrossGrid(boxPt[3], boxPt[0], boxPt[4], boxPt[7]);
  
  // stroke(0);
  // beginShape();
  // vertex(boxPt[0].x, boxPt[0].y, boxPt[0].z);
  // vertex(boxPt[4].x, boxPt[4].y, boxPt[4].z);
  // endShape();
  // beginShape();
  // vertex(boxPt[1].x, boxPt[1].y, boxPt[1].z);
  // vertex(boxPt[5].x, boxPt[5].y, boxPt[5].z);
  // endShape();
  // beginShape();
  // vertex(boxPt[2].x, boxPt[2].y, boxPt[2].z);
  // vertex(boxPt[6].x, boxPt[6].y, boxPt[6].z);
  // endShape();
  // beginShape();
  // vertex(boxPt[3].x, boxPt[3].y, boxPt[3].z);
  // vertex(boxPt[7].x, boxPt[7].y, boxPt[7].z);
  // endShape();
}

// window.onload = function() {
//   this.gui = new dat.GUI();
//   gui.add(datParams, 'x', -width/2, width/2);
//   gui.add(datParams, 'y', -height/2, height/2);
//   gui.add(datParams, 'z', 0, 1500);
//   gui.add(datParams, 'rX', -PI, PI);
//   gui.add(datParams, 'rY', -PI, PI);
//   gui.add(datParams, 'rZ', -PI, PI);
//   gui.add(datParams, 'reset');
// }