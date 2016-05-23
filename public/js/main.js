// Generated by CoffeeScript 1.10.0
(function() {
  var animate, bkg, bkg_ctx, calculateFps, canvas, ctx, draw, erase, fps, fpsDisplay, initClickHandlers, initModules, lastFpsUpdateTime, lastTime, lastkeyDown, metrics, missleFactory, paused, renderStatics, stateEngine, warheadFactory;

  fpsDisplay = document.getElementById('fps_display');

  canvas = document.getElementById('main_canvas');

  bkg = document.getElementById('bkg_canvas');

  bkg_ctx = bkg.getContext('2d');

  ctx = canvas.getContext('2d');

  lastTime = 0;

  lastFpsUpdateTime = 0;

  lastkeyDown = 0;

  fps = 60;

  paused = false;

  metrics = null;

  missleFactory = null;

  warheadFactory = null;

  stateEngine = new GameState();

  initModules = function() {
    var colors, missleOrigin;
    scene.metrics.setup(ctx);
    metrics = scene.metrics.getMetrics();
    colors = scene.metrics.getColors();
    scene.bkg.setup(ctx, metrics, colors);
    scene.main.setup(ctx, metrics, colors);
    missleOrigin = new Point(metrics.center.x, metrics.height - metrics.cannonHeight);
    missleFactory = new MissleFactory(20).buildMissles(missleOrigin);
    return warheadFactory = new WarheadFactory(40).buildWarheads();
  };

  initClickHandlers = function() {
    return ctx.canvas.addEventListener('click', function(event) {
      var missle;
      missle = missleFactory.requestMissle();
      console.log(missle);
      if (missle != null) {
        missle.setTarget(event.clientX, event.clientY);
        stateEngine.addActor(missle, function(x, y) {
          var warhead;
          missleFactory.recycle(missle);
          warhead = warheadFactory.requestWarhead();
          warhead.setTarget(x, y);
          stateEngine.addActor(warhead, function(x, y) {
            return console.log("that blowed up good");
          });
          return warhead.explode();
        });
        return missle.launch();
      }
    });
  };

  renderStatics = function() {
    bkg_ctx.fillStyle = "#000";
    bkg_ctx.fillRect(0, 0, canvas.width, canvas.height);
    return scene.bkg.render(bkg_ctx);
  };

  erase = function() {
    return ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  draw = function(now) {
    stateEngine.update(new Date().getTime(), ctx);
    return scene.main.render(ctx);
  };

  calculateFps = function(now) {
    fps = 1000 / (now - lastTime);
    if (now - lastFpsUpdateTime > 1000) {
      lastFpsUpdateTime = now;
      fpsDisplay.innerHTML = fps.toFixed(0) + ' fps';
    }
    lastTime = now;
    return fps;
  };

  animate = function(now) {
    if (now == null) {
      now = new Date().getTime();
    }
    fps = calculateFps(now);
    if (!paused) {
      erase();
      draw(now);
    }
    return requestNextAnimationFrame(animate);
  };

  initModules();

  initClickHandlers();

  renderStatics();

  animate();

}).call(this);
