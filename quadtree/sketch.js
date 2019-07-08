let qtree;

function setup() {
  createCanvas(400, 400);
  //   Boundary is the rectangle which is what the values have to be this.boundary.x
  let boundary = new Rectangle(200, 200, 200, 200);
  qtree = new QuadTree(boundary, 4);
  console.log(qtree);

  for (let i = 0; i < 600; i++) {
    let p = new Point(random(width), random(height));
    qtree.insert(p);
  }
  background(0);
  qtree.show();

  stroke(0, 255, 0);
  rectMode(CENTER);
  let range = new Rectangle(random(width), random(height), 25, 25);
  rect(range.x, range.y, range.w * 2, range.h * 2);

  //   let points = qtree.query(range);

  let points = [];
  qtree.query(range, points);

  for (let p of points) {
    strokeWeight(4);
    stroke(0, 255, 0);
    point(p.x, p.y);
  }
  console.log(points);
  console.log("count", count);
}

function draw() {
  //   if (mouseIsPressed) {
  //     for (let i = 0; i <= 5; i++) {
  //       let m = new Point(mouseX + random(-5, 5), mouseY + random(-5, 5));
  //       qtree.insert(m);
  //     }
  //   }
  //   background(0);
  //   qtree.show();
  //   stroke(0, 255, 0);
  //   rectMode(CENTER);
  //   let range = new Rectangle(250, 250, 107, 75);
  //   rect(range.x, range.y, range.w * 2, range.h * 2);
  //   let points = qtree.query(range);
  //   console.log(points);
}
