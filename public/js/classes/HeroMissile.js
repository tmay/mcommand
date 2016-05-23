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
  }

  get isFinished() {
      return this.isComplete;
  }

  set listner(OnDestroylistner) {
      this.OnDestroylistner = OnDestroylistner;
  }

  draw(ctx, time) {
      super.draw(ctx,time);
      if (this.areWeThereYet()) {
          this.isComplete = true;
      } else {
        var factor = this.getEase((time - this[launchTime]), 0, 1, 2000);
        this._x -= (this._x - this._targetX) * factor;
        this._y -= (this._y - this._targetY) * factor;

        ctx.beginPath()
        ctx.arc(this._x, this._y, this.radius, 0, 2 * Math.PI, true)
        ctx.fillStyle = "red"
        ctx.fill()
      }
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
  }

  get launchTime() {
    return this[launchTime];
  }

  launch() {
      this[launchTime] = new Date().getTime();
      //setInterval(() => {console.log (this.toString())}, 500)
  }

  reset() {
    this.target = null;
    this._targetX = 0;
    this._targetY = 0;
    this.isComplete = false;
    this._x = this.originPoint.x;
    this._y = this.originPoint.y;
    this[launchTime] = 0;
  }

  toString() {
    return "I'm missile"+this.serialNum+"; target: "+this._targetX+", "+this._targetY;
  }
}
