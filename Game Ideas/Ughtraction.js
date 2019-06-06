var pos, target, rest, vel, r, drag, strength, currentX, currentY, ballWidth;

let dragging,
  hover = false;

let offsetX, offsetY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //   frameRate(5);
  r = 60; //radius
  pos = 100; //where it initially goes to (Ball)
  target = 100; // where it wants to go (Mouse)
  vel = 0; // velocity
  rest = 200;

  currentX = 100;
  currentY = 100;
  ballWidth = 75;
}

function draw() {
  //draw is called every frame
  background(255);
  target = 100;

  //   console.log(offsetX, offsetY, "Offset");
  //   console.log(currentX, currentY, "Current");
  //   console.log(mouseX, mouseY, "mouse");

  var force = rest - currentY; //how far "stretched"
  force *= strength; // the "strength" of our "spring"
  vel *= drag; // reduce the existing velocity a bit with drag
  vel += force; // add this frame's force to the velocity
  pos += vel; // update the position with the adjusted velocity

  //draw our circle
  fill(214, 71, 150);
  ellipse(currentX, currentY, ballWidth);
  ellipseMode(CORNER);

  if (
    mouseX > currentX &&
    mouseX < currentX + ballWidth &&
    mouseY > currentY &&
    mouseY < currentY + ballWidth
  ) {
    rollover = true;
    console.log("Rollover Baby!");
  } else {
    rollover = false;
  }

  if (dragging) {
    currentX = mouseX + offsetX;
    currentY = mouseY + offsetY;
  }

  ellipse(currentX, pos / mouseX, ballWidth);
}

function setValues() {
  drag = 0.7; //need to take some force away, 1 = no drag
  strength = 0.5; // the "strength" of the spring, out of 1
}

function mousePressed() {
  // Did I click on the rectangle?
  if (
    mouseX > currentX &&
    mouseX < currentX + ballWidth &&
    mouseY > currentY &&
    mouseY < currentY + ballWidth
  ) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = currentX - mouseX;
    offsetY = currentY - mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
  //   console.log(mouseX, mouseY);
}

mouseReleased();

setValues();

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
