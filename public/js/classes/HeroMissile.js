var launchTime = Symbol();
class HeroMissile extends Actor {
  constructor(num, origin) {
    super();
    this.target = null;
    this.serial = num;
    this.originPoint = origin;
    this._targetX = 0;
    this._targetY = 0;
    this._x = origin.x;
    this._y = origin.y;
    this.radius = 2;
    this.isComplete = false;
    this[launchTime] = 0;
    this.color1 = "#ff2a3a";
    this.color2 = "#ffff00";
    this.lastTime = 0;
    this.dist = 0;
  }

  get isFinished() {
      return this.isComplete;
  }

  draw(ctx, time) {
      super.draw(ctx,time);
      var elapsed = time - this[launchTime];
      if (this.areWeThereYet()) {
          this.isComplete = true;
      } else {
        var factor = this.getEase(elapsed, 0.1, 1, 2000);
        this._x -= (this._x - this._targetX) * factor;
        this._y -= (this._y - this._targetY) * factor;

        ctx.beginPath()
        ctx.arc(this._x, this._y, this.radius, 0, 2 * Math.PI, true)
        var color = this.color1;
        if (elapsed - this.lastTime > 100) {
          color = this.color2;
          this.lastTime = elapsed;
        }
        ctx.fillStyle = color;
        ctx.fill()

      }
  }

  distance(x1, y1, x2, y2) {
      var dx = x2 - x1;
      var dy = y2 - y1;
      return Math.sqrt(dx*dx+dy*dy);
  }

  areWeThereYet() {
      return (this.x === this._targetX && this.y === this._targetY)
  }

  getEase(t, b, c, d) {
    var ts =(t/=d)*t;
    var tc =ts*t;
    return b+c*(tc*ts);
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
    this.dist = this.distance(this.x, this.y, x, y);
  }

  get launchTime() {
    return this[launchTime];
  }

  launch() {
      this[launchTime] = new Date().getTime();
  }

  reset() {
    this.target = null;
    this._targetX = 0;
    this._targetY = 0;
    this.isComplete = false;
    this._x = this.originPoint.x;
    this._y = this.originPoint.y;
    this[launchTime] = 0;
    this.lastTime = 0;
  }

  toString() {
    return "I'm missile"+this.serialNum+"; target: "+this._targetX+", "+this._targetY;
  }
}
