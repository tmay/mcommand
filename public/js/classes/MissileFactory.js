class MissileFactory {
  constructor(stockpileSize) {
    this._stockpile = new Array(stockpileSize);
    this._tracker = new Array(stockpileSize);
    this._idCount = 0;
  }

//I feel like there is a better way to loop these days
  buildMissiles(origin) {
    for (var i=0;i<this._stockpile.length;i++) {
      this._stockpile[i] = new HeroMissile(i, origin);
      this._tracker[i] = 1;
    }
    return this;
  }

  requestMissile() {
      var serialNum = this._tracker.indexOf(1);
      var missile = null;
      if (serialNum > -1) {
        this._tracker[serialNum] = 0;
        missile = this._stockpile[serialNum];
      }
      return missile;
  }

  recycle(missile) {
    console.log("recycling "+missile);
    missile.reset();
    this._tracker[missile.serialNum] = 1;
  }

  getNewId() {
    return this._idCount++;
  }
}
