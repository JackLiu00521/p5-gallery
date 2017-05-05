function nose() {
  this.c = 0;
  this.siz = 35;
  
  this.update = function(x, y) {
    this.x = x;
    this.y = y;
    
    if(duration > 120) {
      this.c = frameCount % 100;
      this.siz = 35 + (duration-120) / 10;
      if(this.siz > 60) {
        this.siz = 60;
      }
      var ranX = random(-(duration-120)/60, (duration-120)/60);
      var ranY = random(-(duration-120)/60, (duration-120)/60);
      
      if(ranX > 8) {
        ranX = 8
      }
      if(ranY > 8) {
        ranY = 8
      }
      
      this.x = this.x + ranX;
      this.y = this.y + ranY;
    }
  }
  
  this.origin = function() {
    this.c = 0;
    this.siz = 35;
  }
  
  this.display = function() {
    fill(this.c, 100, 50);
    ellipse(this.x, this.y, this.siz, this.siz);
    fill(255);
    ellipse(this.x-6, this.y-6, 10, 10);
  }
}