var num = 800;
var v = [];
var tri;
var w = 600;
var h = 400;
var c;
var img;
var fileCount = 0;

function preload() {
  img = loadImage("DSC_4258.JPG");
}


function setup() {
  var cnv = createCanvas(w,h);
  var x = (windowWidth - w) / 2;
  var y = (windowHeight - h) / 2;
  cnv.position(x, y);
  
  noStroke();
  frameRate(8);
  img.resize(w, 0);
}


function draw() {
  // frameRate(8);
  // num = floor(map(mouseX, 0, w, 500, 2000));
  // console.log(mouseX, num);
  
  for(i = 0; i < num; i++){
    v[i] = [random(-100, w+100), random(-100, h+100)];
  }
  
  tri = Delaunay.triangulate(v);
  var triL = tri.length;
  
  for(i = triL; i; ) {
    var j = i;
    j--;var pt1 = new p5.Vector(v[tri[j]][0], v[tri[j]][1]);
    j--;var pt2 = new p5.Vector(v[tri[j]][0], v[tri[j]][1]);
    j--;var pt3 = new p5.Vector(v[tri[j]][0], v[tri[j]][1]);
    var mid = new p5.Vector((pt1.x + pt2.x + pt3.x) / 3, (pt1.y + pt2.y + pt3.y) / 3);
    c = img.get(mid.x, mid.y);
    
    fill(c);
    beginShape();
    i--;vertex(v[tri[i]][0], v[tri[i]][1]);
    i--;vertex(v[tri[i]][0], v[tri[i]][1]);
    i--;vertex(v[tri[i]][0], v[tri[i]][1]);
    endShape(CLOSE);
  }
}

// function mouseMoved() {
//   fr = 8;
//   frameRate(fr);
// }

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
       img.resize(w, 0);
    });
  }
}