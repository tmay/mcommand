var launchTime = Symbol();
class HeroMissile extends Actor {
  constructor(num, origin) {
    super();
    this.serial = num;
    this.originPoint = origin;
    this.orig
    this.reset(origin);
  }

  get isFinished() {
      return this.isComplete;
  }

  draw (ctx, time) {
    var elapsed = time - this[launchTime];
    if (elapsed < 500) {
      this._force = 0.05
    } else  if (elapsed > 500 && elapsed < 1000){
      this._force = 0.01
    } else if (elapsed > 1000){
      this._force = 0.25
    }
    if (this.distance(this._x, this._y, this._targetX, this._targetY) > 10) {
      var dx = this._targetX - this._x;
      var dy = this._targetY - this._y;
      var angle = Math.atan2(dy,dx);

      var ax = Math.cos(angle) * this._force;
      var ay = Math.sin(angle) * this._force;

      this._vx += ax;
      this._vy += ay;
      this._x += this._vx;
      this._y += this._vy;


      ctx.beginPath();
      ctx.arc(this._x, this._y, this.radius, 0, 2 * Math.PI, true);
      var color = this.color1;
      if (elapsed - this.lastTime > 100) {
        color = this.color2;
        this.lastTime = elapsed;
      }
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      this.isComplete = true;
    }
  }

  distance(x1, y1, x2, y2) {
      var dx = x2 - x1;
      var dy = y2 - y1;
      return Math.sqrt(dx*dx+dy*dy);
  }

  get serialNum() {
      return this.serial;
  }

  set x(val) {
    this._x = val;
  }

  get x() {
    return this._x;
  }

  set y(val) {
    this._y = val;
  }
  get y() {
    return this._y;
  }
  setTarget(x,y) {
    this._targetX = x;
    this._targetY = y;
    //this.dist = this.distance(this.x, this.y, x, y);
  }

  get launchTime() {
    return this[launchTime];
  }

  launch() {
      this[launchTime] = new Date().getTime();
  }

  reset(origin) {
    this.target = null;
    this._targetX = 0;
    this._targetY = 0;
    this._x = this.originPoint.x;
    this._y = this.originPoint.y;
    this.radius = 2;
    this.isComplete = false;
    this[launchTime] = 0;
    this.color1 = "#ff2a3a";
    this.color2 = "#ffff00";
    this.lastTime = 0;
    this.dist = 0;
    //
    this._vx = 0;
    this._vy = 0;
    this._force = 0.15;
  }

  toString() {
    return "I'm missile"+this.serialNum+"; target: "+this._targetX+", "+this._targetY;
  }
}
