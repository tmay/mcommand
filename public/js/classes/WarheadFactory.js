class WarheadFactory {
  constructor(stockpileSize) {
    this._stockpile = new Array(stockpileSize);
    this._tracker = new Array(stockpileSize);
    this._idCount = 0;
  }

  //I feel like there is a better way to loop these days
  buildWarheads() {
    for (var i=0;i<this._stockpile.length;i++) {
      this._stockpile[i] = new Warhead(i);
      this._tracker[i] = 1;
    }
    return this;
  }

  requestWarhead() {
      var serialNum = this._tracker.indexOf(1);
      var warhead = null;
      if (serialNum > -1) {
        this._tracker[serialNum] = 0;
        warhead = this._stockpile[serialNum];
      }
      return warhead;
  }

  recycle(warhead) {
    console.log("recycling "+warhead);
    warhead.reset();
    this._tracker[warhead.serialNum] = 1;
  }

  getNewId() {
    return this._idCount++;
  }
}
