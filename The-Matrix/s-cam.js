var w = 900;
var h = 600;

var texts = [];
var textW = 15;
var textH = 12;
var textS = 16;
var textWords = "ABCĆČDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzž"
var textWordsLength = textWords.length;
var fontThin, fontLight, fontRegular, fontBold;

var columns = Math.floor(w / textW);
var rows = Math.floor(h / textH);
var videoInput;


function preload() {
  fontThin = loadFont("Roboto_Slab/RobotoSlab-Thin.ttf");
  // fontLight = loadFont("Roboto_Slab/RobotoSlab-Light.ttf");
  fontRegular = loadFont("Roboto_Slab/RobotoSlab-Regular.ttf");
  fontBold = loadFont("Roboto_Slab/RobotoSlab-Bold.ttf");
}

function setup() {
  videoInput = createCapture(VIDEO);
  var x = (windowWidth - w) / 2;
  var y = (windowHeight - h) / 2;
  
  videoInput.size(w, h);
  videoInput.position(x, y);
  
  
  var cnv = createCanvas(w, h);
  cnv.position(x, y);
  frameRate(30);
}

function draw() {
  background(255);
  
  videoInput.loadPixels();
  for(i = 0; i < columns; i++) {
	  texts[i] = [];
	  for(j = 0; j < rows; j++) {
	    texts[i][j] = {
	      x: i*textW,
	      y: j*textH,
	      word: textWords.charAt(Math.floor(Math.random() * textWords.length)),
	    }
	    var index = (texts[i][j].x + texts[i][j].y * w) * 4; 
	    var r = videoInput.pixels[index+0];
	    var g = videoInput.pixels[index+1];
	    var b = videoInput.pixels[index+2];
	    
	    texts[i][j].b = (r+g+b) / 3;
	    texts[i][j].b = brightness(color(r, g, b, 255));
	   // texts[i][j].c =  color(r,Math.floor(Math.random()*255),255);
	  }
	}
  
  for(i = columns-1; i >= 0 ; i--) {
	  for(j = rows-1; j >= 0; j--) {
	    

	    if(texts[i][j].b < 15) {
	      textFont(fontBold);
	     // fill(texts[i][j].c);
	      text(texts[i][j].word, texts[i][j].x, texts[i][j].y);
	    }
	    else if(texts[i][j].b < 40) {
	      textFont(fontRegular);
	     // fill(texts[i][j].c);
	      text(texts[i][j].word, texts[i][j].x, texts[i][j].y);
	    }
	    else if(texts[i][j].b < 70) {
	      textFont(fontThin);
	     // fill(texts[i][j].c);
	      text(texts[i][j].word, texts[i][j].x, texts[i][j].y);
	    }

	    var speedGrowth = (Math.sin(frameCount / 35) + 1) * 8;
	    var speedFade = (Math.cos(frameCount / 35) + 1) * 8;

      if(j === 0) {
        if(texts[i][j].word === " ") {
          if(Math.floor(Math.random() * speedGrowth) === 1) {
            texts[i][j].word = textWords.charAt(Math.floor(Math.random() * textWordsLength));
          }
          else {
            texts[i][j].word = " ";
          }
        }
        else {
          if(Math.floor(Math.random() * speedFade) === 2) {
            texts[i][j].word = " ";
          }
          else {
            texts[i][j].word = textWords.charAt(Math.floor(Math.random() * textWordsLength));
          }
    	  }
      }
      else {
    	  texts[i][j].word = texts[i][j-1].word;
      }
	  }
  }
}