var inc = 0.1; // Tie this to slider to increase/decrease zoom level

var scl = 10;

var cols, rows;

var fr;

var zoff = 0;

var particles = [];

var flowField = [];

function setup() {
  createCanvas(800, 600);
  background(255);

  cols = floor(width / scl);

  rows = floor(height / scl);

  fr = createP("");

  flowField = new Array(cols * rows);

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  var yoff = 0;

  for (var y = 0; y < rows; y++) {
    var xoff = 0;

    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      flowField[index] = v;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;

      var r = noise(xoff, yoff) * 255;

      var v = p5.Vector.fromAngle(angle);
      v.setMag(1); // controlling how much the particles follow the flowfield

      xoff += inc;

      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // fill(r);

      // line(0, 0, scl, 0);

      // pop();
      // rect(x * scl, y * scl, scl, scl);
    }
    yoff += inc;

    zoff += 0.0009; //vectors changing over time
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  particles[0].update();
  particles[0].show();
  fr.html(floor(frameRate()));
  noLoop();
  // }
}
