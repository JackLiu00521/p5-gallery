var img;
var imgMaxH;
var imgMaxW;

var texts = [];
var textW = 15;
var textH = 12;
var textS = 16;
var textWords = "ABCĆČDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzž"
var textWordsLength = textWords.length;
var fontThin, fontRegular, fontBold;

var columns;
var rows;


function preload(){
  img = loadImage("IMG_2984_1.jpg");
  fontThin = loadFont("Roboto_Slab/RobotoSlab-Thin.ttf");
  fontRegular = loadFont("Roboto_Slab/RobotoSlab-Regular.ttf");
  fontBold = loadFont("Roboto_Slab/RobotoSlab-Bold.ttf");
}


function setup() {
  cnvW = windowWidth - 50;
  cnvH = windowHeight - 50;
	var cnv = createCanvas(cnvW, cnvH);
// 	var x = (windowWidth - cnvW) / 2;
//   var y = (windowHeight - cnvH) / 2;
  cnv.position(25, 25);
  // imageMode(CENTER);
  textSize(textS);
  frameRate(12);
	initPic();
}

function draw() {
  background(255);
  
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

function initPic() {
  if(img.width > img.height) {
    img.resize(cnvW - 200, 0);
  }
  else {
    img.resize(0, cnvH);
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

function keyTyped() {
  if(key === 's'){
      saveCanvas('Matrix-' + month() + day() + hour() + minute(), 'jpg');
  }
  if (key === 'u') {
    var fileSelect = createFileInput(gotFile);
  }
}

function gotFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, function() {
       initPic();
    });
  }
}
