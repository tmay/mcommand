namespace "scene.bkg", (exports) ->
  MAX_STARS = 2000
  CREATE_STAR_CHANCE    = 75
  width = 0
  height = 0
  lowerThird = 0
  ground = 0
  metrics = null
  setupHasRun = false

  exports.setup = (ctx, m, c) ->
    metrics = m
    colors = c
    setupHasRun = true

  exports.render = (ctx) ->
    drawSky(ctx)
    drawStarField(ctx)

  drawSky = (ctx) ->
    for i in [0...metrics.height]
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(metrics.width, i)
      if i < metrics.ground
        ctx.strokeStyle = scene.utils.interpolateColor("AA0000", "000000", i, 200)
        ctx.stroke()
      gradient = ctx.createLinearGradient(0, metrics.ground, 0, metrics.height)
      gradient.addColorStop(0, "#855055")
      gradient.addColorStop(1, "black")
      ctx.fillStyle = gradient
      ctx.fillRect(0, metrics.ground, metrics.width, metrics.ground-40)


  drawStarField = (ctx) ->
    for star in createStarFieldArray(MAX_STARS)
      ctx.beginPath()
      ctx.arc(star.x, star.y, 1, 0, 2 * Math.PI, true)
      ctx.fillStyle = star.color
      ctx.fill()

  createStarFieldArray = (count) ->
    starField = []
    i = 0
    while i < count
      chance = (scene.utils.rand(0,100) < CREATE_STAR_CHANCE)
      if chance
        x = scene.utils.rand(0,metrics.width*2)
        y = scene.utils.rand(0,metrics.ground)
        color =  scene.utils.interpolateColor("000000","FFFFFF",scene.utils.rand(0,18),2)
        starField.push new Star(x,y,color)
      i++

    return starField
