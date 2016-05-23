class Actor {
  constructor(id) {
    this.id = Actor.getNewId();
  }

  static getNewId() {
    if (!this._idCount)
      this._idCount = 0;
    return this._idCount++;
  }

  draw(ctx, time) {
      //extend me
  }

  onDestroy() {
      //extend me
  }

  toString() {
    return this.id;
  }
}
