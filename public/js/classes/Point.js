class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  static distance(a,b) {
      var dx = b.x - a.x;
      var dy = b.y - a.y;
      return Math.sqrt(dx*dx+dy*dy);
  }

  toString() {
    return "x:"+this.x+" y:"+this.y;
  }
  //fancy static math functions should go here
}
