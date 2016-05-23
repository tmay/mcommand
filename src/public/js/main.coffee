fpsDisplay        = document.getElementById 'fps_display'
canvas            = document.getElementById 'main_canvas'
bkg               = document.getElementById 'bkg_canvas'
bkg_ctx           = bkg.getContext '2d'
ctx               = canvas.getContext '2d'
lastTime          = 0
lastFpsUpdateTime = 0
lastkeyDown       = 0
fps               = 60
paused            = false
metrics = null

missileFactory = null;
warheadFactory = null;
stateEngine = new GameState();

initModules = ->
  scene.metrics.setup(ctx)
  metrics = scene.metrics.getMetrics()
  colors = scene.metrics.getColors()
  scene.bkg.setup(ctx, metrics, colors)
  scene.main.setup(ctx, metrics, colors)
  missileOrigin = new Point(metrics.center.x, metrics.height - metrics.cannonHeight);
  missileFactory = new MissileFactory(20).buildMissiles(missileOrigin);
  warheadFactory = new WarheadFactory(40).buildWarheads();

initClickHandlers = ->
  ctx.canvas.addEventListener 'click', (event) ->
    missile = missileFactory.requestMissile();
    console.log missile
    if missile?
      missile.setTarget(event.clientX, event.clientY);
      stateEngine.addActor(missile, (x,y) ->
        missileFactory.recycle(missile)
        warhead = warheadFactory.requestWarhead();
        warhead.setTarget(x,y);
        stateEngine.addActor(warhead, (x,y) ->
          console.log "that blowed up good";
        );
        warhead.explode();
      );
      missile.launch();

renderStatics = ->
  bkg_ctx.fillStyle = "#000"
  bkg_ctx.fillRect(0,0,canvas.width,canvas.height)
  scene.bkg.render(bkg_ctx)


erase = () ->
  ctx.clearRect 0,0,canvas.width,canvas.height

draw = (now) ->
  stateEngine.update(new Date().getTime(), ctx);
  scene.main.render(ctx)

calculateFps = (now) ->
  fps = 1000 / (now - lastTime)

  if now - lastFpsUpdateTime > 1000
    lastFpsUpdateTime = now;
    fpsDisplay.innerHTML = fps.toFixed(0) + ' fps';

  lastTime = now
  fps

animate = (now) ->
  if not now?
    now = new Date().getTime();

  fps = calculateFps(now)
  if not paused
    erase()
    draw(now)
  requestNextAnimationFrame(animate)

#Run!
initModules()
initClickHandlers()
renderStatics()
animate()
