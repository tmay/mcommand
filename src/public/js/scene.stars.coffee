namespace "scene.stars", (exports) ->
  DEEP_SPACE_VELOCITY   = 40
  MIDDLE_SPACE_VELOCITY = 60
  NEAR_SPACE_VELOCITY   = 80
  MAX_STARS             = 1000
  CREATE_STAR_CHANCE    = 50

  deepSpace   = null
  middleSpace = null
  nearSpace   = null
  hasStars    = false
  state    = {}
  ctx         = null
  deep        = 0
  middle      = 0
  near        = 0

  exports.setState = (gameState) ->
    state = gameState
    DEEP_SPACE_VELOCITY   = state.velocity/3
    MIDDLE_SPACE_VELOCITY = state.velocity/2
    NEAR_SPACE_VELOCITY   = state.velocity

  exports.render = (contex, vx, fps) ->
    ctx = contex

    if not hasStars
      deepSpace = renderToCanvas(ctx.canvas.width, ctx.canvas.height, (ctx) ->
        for star in createStarField(MAX_STARS)
          ctx.beginPath()
          ctx.arc(star.x, star.y, 1, 0, 2 * Math.PI, true)
          ctx.fillStyle = star.color
          ctx.fill()
      )

      middleSpace = renderToCanvas(ctx.canvas.width, ctx.canvas.height, (ctx) ->
        for star in createStarField(MAX_STARS)
          ctx.beginPath()
          ctx.arc(star.x, star.y, 1, 0, 2 * Math.PI, true)
          ctx.fillStyle = star.color
          ctx.fill()
      )
      nearSpace = renderToCanvas(ctx.canvas.width, ctx.canvas.height, (ctx) ->
        ctx.fillStyle = "rgba(3,3,3,.1)"
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)
        ctx.fillStyle = "#000000"
        ctx.strokeRect(0,0,ctx.canvas.width,ctx.canvas.height-1)
        ###
        for star in createStarField(MAX_STARS)
          ctx.beginPath()
          ctx.arc(star.x, star.y, 1, 0, 2 * Math.PI, true)
          ctx.fillStyle = star.color
          ctx.fill()
        ###
      )
      hasStars = true
    else
      DEEP_SPACE_VELOCITY   = (vx/3)/fps
      MIDDLE_SPACE_VELOCITY = (vx/2)/fps
      NEAR_SPACE_VELOCITY   = vx/fps

      if vx > 0
        deep = (if deep < ctx.canvas.width-1 then deep + DEEP_SPACE_VELOCITY else 0)
        drawStarField(-deep, deepSpace)
        middle = (if middle < ctx.canvas.width-1 then middle + MIDDLE_SPACE_VELOCITY else 0)
        drawStarField(-middle, middleSpace)
        near = (if near < ctx.canvas.width-1 then near + NEAR_SPACE_VELOCITY else 0)
        drawStarField(-near, nearSpace)
      else
        deep = (if deep > 0 then deep + DEEP_SPACE_VELOCITY else ctx.canvas.width)
        drawStarField(-deep, deepSpace)
        middle = (if middle > 0 then middle + MIDDLE_SPACE_VELOCITY else ctx.canvas.width)
        drawStarField(-middle, middleSpace)
        near = (if near > 0 then near + NEAR_SPACE_VELOCITY else ctx.canvas.width)
        drawStarField(-near, nearSpace)

  drawStarField = (offset, stars) ->
    ctx.drawImage(stars,offset,0)
    ctx.drawImage(stars,offset+ctx.canvas.width,0)

  createStarField = (count) ->
    starField = []

    i = 0
    while i < count
      chance = (rand(0,100) < CREATE_STAR_CHANCE)
      if chance
        x = rand(0,ctx.canvas.width*2)
        y = rand(0,ctx.canvas.height)
        color =  interpolateColor("000000","FFFFFF",rand(0,18),1)
        starField.push new Star(x,y,color)
      i++

    return starField


  rand = (min, max) ->
    parseInt(Math.random() * (max - min + 1), 10) + min

  #from http://snipplr.com/view.php?codeview&id=19601
  interpolateColor = (minColor, maxColor, maxDepth, depth) ->
    d2h = (d) ->
      d.toString 16
    h2d = (h) ->
      parseInt h, 16
    return minColor  if depth is 0
    return maxColor  if depth is maxDepth
    color = "#"
    i = 1

    while i <= 6
      minVal = new Number(h2d(minColor.substr(i, 2)))
      maxVal = new Number(h2d(maxColor.substr(i, 2)))
      nVal = minVal + (maxVal - minVal) * (depth / maxDepth)
      val = d2h(Math.floor(nVal))
      val = "0" + val  while val.length < 2
      color += val
      i += 2
    color

  renderToCanvas = (width, height, renderFunction) ->
    buffer = document.createElement("canvas")
    buffer.width = width
    buffer.height = height
    renderFunction buffer.getContext("2d")
    buffer
