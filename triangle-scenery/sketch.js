var num = 400;
var v = [];
var tri;
var w = 600;
var h = 400;
var c;
var img;
var fileCount = 0;
// var picX;
// var picY;

function preload() {
  img = loadImage("DSC_4258.JPG");
}


function setup() {
  var cnv = createCanvas(w,h);
  var x = (windowWidth - w) / 2;
  var y = (windowHeight - h) / 2;
  cnv.position(x, y);

  noStroke();
  img.resize(w, 0);

  // frameRate(1);

  // picX = (windowWidth - img.width) / 2;
  // picY = (windowHeight - img.height) / 2;
}


function draw() {
  frameRate(1);
  // num = floor(map(sin(frameCount * 0.6), -1, 1, 100, 700));
  // console.log(num);


  for(i = 0; i < num; i++){
    // v[i] = [Math.floor(random(-200, w+200)), Math.floor(random(-200, h+200))];
    v[i] = [random(-100, w+100), random(-100, h+100)];
  }

  tri = Delaunay.triangulate(v);
  var triL = tri.length;


  for(i = triL; i; ) {
    var j = i;
    j--;var pt1 = new p5.Vector(v[tri[j]][0], v[tri[j]][1]);
    j--;var pt2 = new p5.Vector(v[tri[j]][0], v[tri[j]][1]);
    j--;var pt3 = new p5.Vector(v[tri[j]][0], v[tri[j]][1]);
    var mid = new p5.Vector(Math.floor((pt1.x + pt2.x + pt3.x) / 3), Math.floor((pt1.y + pt2.y + pt3.y) / 3));

    // if (mid.x < 0 || mid.y < 0) {
    //   if(pt1.x > 0 && pt1.y > 0) {
    //     var index = (pt1.x + pt1.y * img.width) * 4;
    //   }
    //   else if (pt2.x > 0 && pt2.y > 0) {
    //     var index = (pt2.x + pt2.y * img.width) * 4;
    //   }
    //   else if (pt3.x > 0 && pt3.y > 0) {
    //     var index = (pt3.x + pt3.y * img.width) * 4;
    //   }
    // }
    // else {
    //   var index = (mid.x + mid.y * img.width) * 4;
    // }
    //
    // console.log(index);
    // var r = img.pixels[index+0];
    // var g = img.pixels[index+1];
    // var b = img.pixels[index+2];
    //
    // c = color(r,g,b);
    c = img.get(mid.x, mid.y);

    fill(c);
    beginShape();
    i--;vertex(v[tri[i]][0], v[tri[i]][1]);
    i--;vertex(v[tri[i]][0], v[tri[i]][1]);
    i--;vertex(v[tri[i]][0], v[tri[i]][1]);
    endShape(CLOSE);
  }
}

function mouseMoved() {
  fr = 8;
  frameRate(fr);
}

function keyTyped() {
  if (key === 'u') {
    var fileSelect = createFileInput(gotFile);
  }
   else if(key === 's'){
     saveCanvas('tri-' + fileCount, 'jpg');
     fileCount += 1;
  }
}

function gotFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, function(img) {
       img.resize(w+50, 0);
       img.position(-25,-10);
    });
  }
}
