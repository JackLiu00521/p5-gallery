var datParams = {};
var fr = 60;
// var fileCount = 0;

var sketch1 = function(p){
  p.w = 600;
  p.h = 600;
  p.margin = 50;

  p.setup = function(){
    p.cnv = p.createCanvas(p.w, p.h);
    p.posX = (p.windowWidth - p.w) / 2;
    p.posY = (p.windowHeight - p.h) /2;
    p.cnv.position(p.posX, p.posY);
    p.frameRate(fr);
    p.background(0);
    // p.noFill();
    p.stroke(255);


    // p.mic = new p5.AudioIn();
    // p.mic.start();

    datParams = {
      ptaCenterX: p.random(p.margin, p.w-p.margin),
      ptaCenterY: p.random(p.margin, p.h-p.margin),
      ptbCenterX: p.random(p.margin, p.w-p.margin),
      ptbCenterY: p.random(p.margin, p.h-p.margin),
      ra: p.floor(p.random(1,15))*10,
      rb: p.floor(p.random(1,15))*10,
      rCan: 130,
      pta_ptmL: 100,
      ptm_ptdL: 100,
      speedCanvas_rpm: 0.3,
    }

    // p.ptd_o = new p5.Vector(datParams.ptaCenterX * datParams.ra, datParams.ptaCenterY);
  }
  p.draw = function(){
    // p.background(0,1);
    p.params = {
      speedCan: function(){return datParams.speedCanvas_rpm * p.TWO_PI * p.frameCount / fr },
      speeda: function(){return this.speedCan() * datParams.rCan / datParams.ra},
      speedb: function(){return this.speedCan() * datParams.rCan / datParams.rb},
    }
    p.pta = new p5.Vector(datParams.ptaCenterX + p.cos(p.params.speeda()) * datParams.ra, datParams.ptaCenterY + p.sin(p.params.speeda()) * datParams.ra);
    p.ptb = new p5.Vector(datParams.ptbCenterX + p.cos(p.params.speedb()) * datParams.rb, datParams.ptbCenterY + p.sin(p.params.speedb()) * datParams.rb);

    p.pta_ptbM = new p5.Vector(p.ptb.x - p.pta.x, p.ptb.y - p.pta.y);
    p.ptm_ptdM = new p5.Vector(p.ptb.y - p.pta.y, p.pta.x - p.ptb.x);

    // p.vol = p.mic.getLevel();
    // datParams.ptm_ptdL = p.map(p.vol, 0, 1, 10, 200);

    p.ptm = p5.Vector.add( p.pta_ptbM.setMag(datParams.pta_ptmL), p.pta );
    p.ptd = p5.Vector.add( p.ptm_ptdM.setMag(datParams.ptm_ptdL), p.ptm);

    p.push();
    p.translate(p.width/2, p.height/2);
    p.rotate(p.params.speedCan());
    p.translate( -p.width/2, -p.height/2);

    // p.line(p.ptd.x, p.ptd.y, p.ptd_o.x, p.ptd_o.y);

    p.ellipse(p.ptd.x, p.ptd.y, .6);
    p.pop()
    // p.ptd_o = p.ptd;
  }
  /*p.keyTyped = function() {
    if(p.key === 'd') {
      if(p.curDis === 0){
        p.curDis = 1;
      } else if(p.curDis === 1){
        p.curDis = 0;
        p.background(0);
      }
    }
  }*/
}

var cnv1 = new p5(sketch1);

/////////////////////// canv2 /////////////////////////////////

var sketch2 = function(p){
  p.disGearsStatus = false;
  p.setup = function(){
    p.cnv = p.createCanvas(cnv1.w, cnv1.h);
    p.cnv.position(cnv1.posX, cnv1.posY);
    p.frameRate(fr);
    // p.background(50);
    p.stroke(255);
    p.noFill();
  }
  p.draw = function(){
    p.clear();

    // p.line(cnv1.pta.x, cnv1.pta.y, cnv1.ptb.x, cnv1.ptb.y);
    // p.line(cnv1.ptm.x, cnv1.ptm.y, cnv1.ptd.x, cnv1.ptd.y);
    // p.line(cnv1.pta.x, cnv1.pta.y, cnv1.ptm.x, cnv1.ptm.y);
    // p.ellipse(datParams.ptaCenterX, datParams.ptaCenterY, 2 * datParams.ra);
    // p.ellipse(datParams.ptbCenterX, datParams.ptbCenterY, 2 * datParams.rb);
    // p.ellipse(cnv1.ptd.x, cnv1.ptd.y,5);
    // p.ellipse(300,300, 130);

    if(p.disGearsStatus === true){
      p.push();
      p.translate(cnv1.width/2, cnv1.height/2);
      p.rotate(cnv1.params.speedCan());
      p.translate( -cnv1.width/2, -cnv1.height/2);
      p.line(cnv1.pta.x, cnv1.pta.y, cnv1.ptb.x, cnv1.ptb.y);
      p.line(cnv1.ptm.x, cnv1.ptm.y, cnv1.ptd.x, cnv1.ptd.y);
      p.line(cnv1.pta.x, cnv1.pta.y, cnv1.ptm.x, cnv1.ptm.y);
      p.ellipse(datParams.ptaCenterX, datParams.ptaCenterY, 2 * datParams.ra);
      p.ellipse(datParams.ptbCenterX, datParams.ptbCenterY, 2 * datParams.rb);
      p.ellipse(cnv1.ptd.x, cnv1.ptd.y,5);
      p.pop();
    }
  }
}

var cnv2 = new p5(sketch2);

window.onload = function() {
  this.gui = new dat.GUI();
  gui.add(datParams, 'ptaCenterX', 0, cnv1.w).listen();
  gui.add(datParams, 'ptaCenterY', 0, cnv1.h).listen();
  gui.add(datParams, 'ptbCenterX', 0, cnv1.w).listen();
  gui.add(datParams, 'ptbCenterY', 0, cnv1.h).listen();
  gui.add(datParams, 'ra', 10, 150);
  gui.add(datParams, 'rb', 10, 150);
  gui.add(datParams, 'pta_ptmL', 10, 200);
  gui.add(datParams, 'speedCanvas_rpm', 0.05, 0.5);
  gui.add(datFunctions, 'displayGears');
  gui.add(datFunctions, 'redraw');
  gui.add(datFunctions, 'savePicture');
}

var datFunctions = {
  displayGears: function() {
    if(cnv2.disGearsStatus === false){
      cnv2.disGearsStatus = true;
    } else {
      cnv2.disGearsStatus = false ;
    }
  },
  redraw: function(){
    cnv1.clear();
    cnv1.background(0);
  },
  savePicture: function(){
    cnv1.saveCanvas('mec-' + cnv1.month() + cnv1.day() + cnv1.hour() + cnv1.minute(), 'jpg');
    // fileCount += 1;
  },
}
