class GameState {
  constructor (){
    this._actors = new Map();
    this._index = 0;
  }

  addActor(actor, callback) {
    this._actors.set(actor, callback);
  }

  removeActor(actor) {
    this._actors.get(actor)();
    this._actors.delete(actor);
  }

  update(time, ctx) {
    for (var entry of this._actors.entries()) {
      entry[0].draw(ctx, time);
      if (entry[0].isFinished) {
          this.removeActor(entry[0]);
      }
      //console.log (entry[0].toString());
    }
  }
}
