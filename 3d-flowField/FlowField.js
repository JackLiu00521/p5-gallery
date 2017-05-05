function FlowField(r) {
  this.resolution = r;
  this.offPlus = r / 200;
  this.cols = width / this.resolution;
  this.rows = height / this.resolution;
  this.zCount = zDepth / this.resolution;
  this.state = true;
  
  this.init = function() {
    this.field = [];
    noiseSeed(Math.floor(random(10000)));
    
    var xoff = 0;
    for(i = 0; i < this.cols; i++) {
      this.field[i] = [];
      var yoff = 0;
      for(j = 0; j < this.rows; j++) {
        var zoff = 0;
        this.field[i][j] = [];
        for(k = 0; k < this.zCount; k++) {
          var theta = new p5.Vector();
          if(this.state) {
            theta.x = map(noise(xoff), 0, 1, 0, 1);
            theta.y = map(noise(yoff), 0, 1, 0, 1);
            theta.z = map(noise(zoff), 0, 1, 0, 1);
          } else {
            theta.x = map(noise(xoff), 0, 1, 0, 1);
            theta.y = map(noise(yoff), 0, 1, 0, 1);
            theta.z = map(noise(zoff), 0, 1, -1, 0);
          }
          theta.normalize();
          this.field[i][j][k] = theta;
          zoff += this.offPlus;
        }
        yoff += this.offPlus;
      }
      xoff += this.offPlus;
    }
  };
  this.init();
  
  this.lookup = function(pos) {
    var column = Math.floor(constrain(pos.x / this.resolution, 0, this.cols - 1));
    var row = Math.floor(constrain(pos.y / this.resolution, 0, this.rows - 1));
    var zCount = Math.floor(constrain(pos.z / this.resolution, 0, this.zCount - 1));
    
    return this.field[column][row][zCount].copy();
  }
  
  this.display = function() {
    var length = this.resolution - 10;
    for(i = 0; i < this.cols; i++) {
      for(j = 0; j < this.rows; j++) {
        for(k = this.zCount-1; k < this.zCount; k++) {
          var posX = i * this.resolution;
          var posY = j * this.resolution;
          var posZ = k * this.resolution;
          
          var l = this.field[i][j][k];
          l.setMag(length);
  
          push();
          translate(posX, posY, posZ);
          rotateX(this.field[i][j][k].x);
          rotateY(this.field[i][j][k].y);
          rotateZ(this.field[i][j][k].z);
          // cone(l.x, l.z);
          beginShape();
          vertex(0,0,0);
          vertex(length, 0, 0);
          endShape();
          pop();
        }
      }
    }
  }
}