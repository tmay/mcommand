namespace "scene.ship", (exports) ->
  state   = {}
  ctx     = null
  center  = 0
  thrustDistMax = 30
  
  exports.setState = (gameState) ->
    state = gameState
    
  exports.render = (contex, vx, inputs, fps) ->
    ctx = contex
    center = {x:ctx.canvas.width/2,y:ctx.canvas.height/2}
    
    drawShip(vx, inputs)
    
    if inputs.l is 1 or inputs.r is 1
      drawThrust(vx, inputs)
    
  drawShip = (vx, input) ->
    ctx.fillStyle = "rgba(255,255,255,1)"
    ctx.beginPath()

    if vx > 0
      ctx.moveTo(center.x - 25, center.y - 10)
      ctx.lineTo(center.x + 25, center.y + 10)
      ctx.lineTo(center.x - 25, center.y + 10)
    else
      ctx.moveTo(center.x + 25, center.y - 10)
      ctx.lineTo(center.x - 25, center.y + 10)
      ctx.lineTo(center.x + 25, center.y + 10)
      
    ctx.closePath()
    ctx.fill()
    
  drawThrust = (vx, input) ->    
    thrustAmt = Math.random() * thrustDistMax
    ctx.fillStyle = "rgba(200,0,0,.8)"
    ctx.beginPath()
    
    if input.r
      ctx.moveTo(center.x - 25, center.y - 10)
      ctx.lineTo(center.x - 25, center.y + 10)
      ctx.lineTo(center.x - (35 + thrustAmt), center.y)
    else 
      ctx.moveTo(center.x + 25, center.y - 10)
      ctx.lineTo(center.x + 25, center.y + 10)
      ctx.lineTo(center.x + (35 + thrustAmt), center.y)
              
    ctx.closePath()
    ctx.fill()