var startTime = Symbol();
var stageOneTime = Symbol();
var stageTwoTime = Symbol();
var totalTime = Symbol();
class Warhead extends Actor {
  constructor(num) {
    super();
    this.serial = num;
    this.radius = 1;
    this.maxRadius = 25;
    this.x = 0;
    this.y = 0;
    this.isComplete = false;
    this[stageOneTime] = 2000;
    this[stageTwoTime] = 2000;
    this[totalTime] = this[stageOneTime] + this[stageTwoTime];
  }

  get isFinished() {
      return this.isComplete;
  }

  setTarget(x,y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, time) {
      var elapsed = time - this[startTime];
      if (elapsed > this[totalTime]) {
        this.isComplete = true;
      } else if (elapsed > this[stageTwoTime]) {
        this.radius = this.getStage1Ease(elapsed, 1, this.maxRadius, this[stageTwoTime]);
      } else if (elapsed < this[stageOneTime]) {
        // this.radius -= (this.radius - 50) *
        //   this.getStage1Ease(elapsed, 0,1,this[stageOneTime]);
        this.radius = this.getStage1Ease(elapsed, 1, this.maxRadius, this[stageOneTime]);
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI, true);
      ctx.fillStyle = "white";
      ctx.fill();
  }

  getStage1Ease(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(-1*ts*ts + 4*tc + -6*ts + 4*t);
  }

  getQuarticEasing(t, b, c, d) {
    var ts = (t/=d)*t;
    return b+c*(ts*ts);
  }

  explode() {
      this[startTime] = new Date().getTime();
  }

  toString() {
    return this.id;
  }

  get serialNum() {
      return this.serial;
  }

  reset() {
    this.isComplete = false;
    this.x = 0;
    this.y = 0;
    this.radius = 0;
  }
}
