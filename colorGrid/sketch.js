var img;
var w = 1100;
var h = 640;
var colors = [];

var posX, posY;

function preload() {
  img = loadImage("phone.jpg");
  // img = loadImage("IMG_2984_1.jpg");
}

function setup() {
	var cnv = createCanvas(w,h);
  posX = (windowWidth - w) / 2;
  posY = (windowHeight - h) / 2;
  cnv.position(posX, posY);
  
  
  img.loadPixels();
}

function draw() {
  background(55);
  // image(img,0,0);
  var tileCount = width / max(mouseX,5);
  var rectSize = width / tileCount;
  
  for(var gridY=0; gridY<tileCount; gridY++) {
    colors[gridY] = [];
    for(var gridX=0; gridX<tileCount; gridX++) {
      var px = Math.floor(gridX*rectSize);
      var py = Math.floor(gridY*rectSize);
      
      var index = (px + py * img.width) * 4; 
	    var r = img.pixels[index+0];
	    var g = img.pixels[index+1];
	    var b = img.pixels[index+2];
      colors[gridY][gridX] = color(r,g,b,255);
      
      fill(colors[gridY][gridX]);
      rect(gridX*rectSize, gridY*rectSize, rectSize, rectSize);
    }
  }
}

function initPic() {
  if(img.width > img.height) {
    img.resize(w, 0);
  }
  else {
    img.resize(0, h);
  }
  var picX = (windowWidth - img.width) / 2
  var picY = (windowHeight - img.height) / 2
  
  columns = Math.floor(img.width / textW);
  rows = Math.floor(img.height / textH);
  
  img.loadPixels();
  for(i = 0; i < columns; i++) {
	  texts[i] = [];
	  for(j = 0; j < rows; j++) {
	    texts[i][j] = {
	      x: i*textW + picX,
	      y: j*textH + picY,
	      word: textWords.charAt(Math.floor(Math.random() * textWordsLength)),
	     // c: color(Math.floor(Math.random() * 150)),
	    };
	    var index = ((texts[i][j].x - picX) + (texts[i][j].y - picY) * img.width) * 4; 
	    var r = img.pixels[index+0];
	    var g = img.pixels[index+1];
	    var b = img.pixels[index+2];
	    
	    texts[i][j].b = (r+g+b) / 3;
	    texts[i][j].b = brightness(color(r, g, b, 255));
	  }
	}
	img.updatePixels();
}