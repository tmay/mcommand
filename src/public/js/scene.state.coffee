namespace "scene.state", (exports) ->

  actors = new Map()

  exports.addActor = (actor) ->
    actors.set("key", actor)

  exports.getActor = (key) ->
    return actors.get(key)

  exports.render = ->
    console.log actors
