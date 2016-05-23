class MissleFactory {
  constructor(stockpileSize) {
    this._stockpile = new Array(stockpileSize);
    this._tracker = new Array(stockpileSize);
    this._idCount = 0;
  }

//I feel like there is a better way to loop these days
  buildMissles(origin) {
    for (var i=0;i<this._stockpile.length;i++) {
      this._stockpile[i] = new HeroMissle(i, origin);
      this._tracker[i] = 1;
    }
    return this;
  }

  requestMissle() {
      var serialNum = this._tracker.indexOf(1);
      var missle = null;
      if (serialNum > -1) {
        this._tracker[serialNum] = 0;
        missle = this._stockpile[serialNum];
      }
      return missle;
  }

  recycle(missle) {
    console.log("recycling "+missle);
    missle.reset();
    this._tracker[missle.serialNum] = 1;
  }

  getNewId() {
    return this._idCount++;
  }
}
