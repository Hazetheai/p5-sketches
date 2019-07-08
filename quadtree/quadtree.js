let count = 0;
// Point(s) where the Quadtree optimization may be required
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Bounding Box
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  //   if the point is within the current selected box (left of the rightmost side, below the top side etc)
  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  //   checks if query selection intersects th quadtree

  intersects(range) {
    return (
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h > this.y - this.h
    );
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }
  //   Boundary is the rectangle which is what the values have to be this.boundary.x
  //   subdivide a quadtree rectangle
  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;

    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);

    let nw = new Rectangle(x - w / 2, y - w / 2, w / 2, h / 2);

    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);

    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    //   North
    this.northEast = new QuadTree(ne, this.capacity);
    this.northWest = new QuadTree(nw, this.capacity);
    //   South
    this.southEast = new QuadTree(se, this.capacity);
    this.southWest = new QuadTree(sw, this.capacity);
    this.divided = true;
  }
  // check if the point is actually inside the boundary
  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    //   add the points if not at capacity
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      //   Could be refactored ==> slight preference given to northeast
      if (this.northEast.insert(point)) {
        return true;
      } else if (this.northWest.insert(point)) {
        return true;
      } else if (this.southEast.insert(point)) {
        return true;
      } else if (this.southWest.insert(point)) {
        return true;
      }
    }
  }

  //   query a section of the quadtree for points
  query(range, found) {
    if (!this.boundary.intersects(range)) {
      return;
    } else {
      for (let p of this.points) {
        count++;
        if (range.contains(p)) {
          found.push(p);
        }
      }

      if (this.divided) {
        this.northEast.query(range, found);
        this.northWest.query(range, found);
        this.southEast.query(range, found);
        this.southWest.query(range, found);
      }
    }
  }

  //   query(range) {
  //     let found = [];
  //     if (!this.boundary.intersects(range)) {
  //       return found;
  //     } else {
  //       for (let p of this.points) {
  //         if (range.contains(p)) {
  //           found.push(p);
  //         }
  //       }
  //       if (this.divided) {
  //         found.concat(this.northWest.query(range));
  //         found.concat(this.northEast.query(range));
  //         found.concat(this.southEast.query(range));
  //         found.concat(this.southWest.query(range));
  //       }

  //       return found;
  //     }
  //   }

  show() {
    stroke(255);
    noFill();
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    if (this.divided) {
      this.northEast.show();
      this.northWest.show();
      this.southEast.show();
      this.southWest.show();
    }

    for (let p of this.points) {
      strokeWeight(1);
      point(p.x, p.y);
    }
  }
}
