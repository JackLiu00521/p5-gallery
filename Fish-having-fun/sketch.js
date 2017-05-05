//var marginWidth =  1000;
//var marginHeight = 600;
var w = [];

function setup() {
  createCanvas(windowWidth, windowHeight)
  //var cnv = createCanvas(marginWidth, marginHeight);
  //var x = (windowWidth - marginWidth) / 2;
  //var y = (windowHeight - marginHeight) / 2;
  //cnv.position(x, y);
  frameRate(500);
  
  for(var i=0; i<200; i++){
    w.push(new walker());
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('fish_'+frameCount, 'jpg');
  }
}

function draw() {
  //colorMode(RGB);
  background(0, 50);
  //frameRate(100);
  
  for(var i=0; i<w.length; i++){
      w[i].update();
      w[i].display();
  }
}

function walker(){
  this.pos = new p5.Vector(random(0, width), random(0, height));
  this.vel = new p5.Vector(0, 0);
  
  this.update = function(){
    //this.grav = new p5.Vector(marginWidth / 2 , marginHeight / 2);
    this.grav = new p5.Vector(mouseX , mouseY);
    this.acc = p5.Vector.sub(this.grav, this.pos);
    this.acc.setMag(0.06);
    
    this.vel.div(1.001);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  this.display = function(){
    colorMode(HSL, 100);
    var c = Math.floor(map(dist(this.pos.x, this.pos.y, this.grav.x, this.grav.y), 0, width*0.9, 100, 0));
    //console.log(c >0);
    //var c = color('hsb(far, 100%, 50%)');
    fill(c, 100, 50);
    noStroke();
    var siz = map(c, 0, 100, 30, 0);
    if(siz < 3){
      siz = 0;
    }
    ellipse(this.pos.x, this.pos.y, siz);
    colorMode(RGB);
  };
  
}