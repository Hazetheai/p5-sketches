var pos,
  target,
  restX,
  restY,
  vel,
  r,
  drag,
  strength,
  currentX,
  currentY,
  ballWidth;

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
  restX = 200;
  restY = 200;

  currentX = restX;
  currentY = restY;
  ballWidth = 75;
  ellipse(currentX, currentY, ballWidth);
}

function draw() {
  //draw is called every frame
  background(255);
  target = 100;
  line(100, 100, currentX + ballWidth / 2, currentY + ballWidth / 2);

  //   console.log(offsetX, offsetY, "Offset");
  //   console.log(currentX, currentY, "Current");
  //   console.log(mouseX, mouseY, "mouse");

  //draw our circle
  fill(214, 71, 150);
  //currently stays put
  ellipse(currentX, currentY, ballWidth);
  //   ellipse(currentX, currentY, ballWidth);
  ellipseMode(CORNER);
  var force = restY - (currentX + currentY) / 2; //how far "stretched"
  force *= strength; // the "strength" of our "spring"
  vel *= drag; // reduce the existing velocity a bit with drag
  vel += force; // add this frame's force to the velocity
  currentY += vel; // update the position with the adjusted velocity
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
  //This ball follows
  //   ellipse(currentX, mouseY, ballWidth);
}

function setValues() {
  drag = 0.7; //need to take some force away, 1 = no drag
  strength = 0.95; // the "strength" of the spring, out of 1
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
  currentX = restX;
  currentY = restY;
  //   console.log(mouseX, mouseY);
}

mouseReleased();

setValues();

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
