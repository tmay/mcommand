namespace "scene.main", (exports) ->
  cityWidthPrecentage = 8
  cannonWidthPercentage = 5
  numberOfCities = 3
  setupHasRun = false
  ctx = null
  metrics = null
  colors = null
  exports.setup = (ctx, m, c) ->
    colors = c
    metrics = m
    ctx = ctx
    setupHasRun = true


  exports.render = (ctx, fps) ->
    drawGround(ctx)
    drawCannon(ctx)
    #drawCities(ctx)
    #drawGuides(ctx)

  drawGround = (ctx) ->
    ctx.beginPath()
    ctx.moveTo(0, metrics.ground)
    ctx.lineTo(metrics.width, metrics.ground)
    ctx.strokeStyle = colors.horizionLine
    ctx.stroke()

  drawCities = (ctx) ->
    cityWidth = (metrics.width * cityWidthPrecentage) / 100
    ctx.fillStyle = "#FFFFFF"
    #left
    ctx.fillRect(metrics.leftThird+(cityWidth/2), metrics.ground-40, cityWidth, 40)
    ctx.fillRect(metrics.leftThird-(cityWidth*2), metrics.ground-40, cityWidth, 40)
    #right
    ctx.fillRect(metrics.rightThird+(cityWidth), metrics.ground-40, cityWidth, 40)
    ctx.fillRect(metrics.rightThird-(cityWidth+(cityWidth/2)), metrics.ground-40, cityWidth, 40)

  drawCannon = (ctx) ->
    cannonWidth = (metrics.width * cannonWidthPercentage) / 100
    ctx.fillRect(metrics.center.x - (cannonWidth/2), metrics.ground-metrics.cannonHeight, cannonWidth, metrics.cannonHeight)

  drawGuides = (ctx) ->
    #console.log metrics
    ctx.beginPath()
    ctx.moveTo(metrics.leftThird, 0)
    ctx.lineTo(metrics.leftThird, metrics.height)
    ctx.moveTo(metrics.rightThird, 0)
    ctx.lineTo(metrics.rightThird, metrics.height)
    ctx.moveTo(metrics.center.x, 0)
    ctx.lineTo(metrics.center.x, metrics.height)
    ctx.moveTo(0, metrics.center.y)
    ctx.lineTo(metrics.width, metrics.center.y)
    ctx.strokeStyle = "#CC0000"
    ctx.stroke()
