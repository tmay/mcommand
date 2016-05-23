namespace "scene.metrics", (exports) ->

  measure = {}
  colors = {}

  exports.setup = (ctx) ->
    canvas = ctx.canvas
    width = canvas.width
    height = canvas.height
    measure =
        width : width
        height : height
        center : {x:width/2,y:height/2}
        lowerThird : height - (height * 0.33333333333)
        ground : height - 50
        leftThird : (width/2)/2
        rightThird : width - (width/2)/2
        cannonHeight: 40
    colors =
      horizionLine : "#994B53"
      groundTop : "#855055"


  exports.getMetrics = ->
    return measure

  exports.getColors = ->
    return colors
