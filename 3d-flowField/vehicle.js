function Vehicle(x, y, z, ms, mf, siz) {
  this.pos = new p5.Vector(x, y, z);
  this.vel = new p5.Vector(0, 0, 0);
  this.acc = new p5.Vector(0, 0, 0);
  this.maxSpeed = ms || 4;
  this.maxForce = mf || 0.1;
  this.siz = siz;

  this.run = function() {
    this.update();
    this.borders();
    this.display();
  }
  
  this.follow = function(flow) {
    var desired = flow.lookup(this.pos);
    desired.mult(this.maxSpeed);
    
    var steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0, 0, 0);
  }
  
  this.borders = function() {
    if (this.pos.x < this.siz) this.pos.x = width-this.siz;
    if (this.pos.y < this.siz) this.pos.y = height-this.siz;
    if (this.pos.z < this.siz) this.pos.z = zDepth-this.siz;
    if (this.pos.x > width-this.siz) this.pos.x = this.siz;
    if (this.pos.y > height-this.siz) this.pos.y = this.siz;
    if (this.pos.z > zDepth-this.siz) this.pos.z = this.siz;
  }
  
  this.display = function() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    // rotateX(-this.vel.x);
    // rotateY(-this.vel.y);
    // rotateZ(-this.vel.z);
    // ellipsoid(20, 30, 40);
    normalMaterial();
    sphere(this.siz/2);
    // cone(this.siz/2, this.siz*2);
    pop();
  }
}