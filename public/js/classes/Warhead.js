class Warhead extends Actor {

  draw(ctx, time) {
      //extend me
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
  
  onDestroy() {
      //extend me
  }

  toString() {
    return this.id;
  }
}
