// Generated by CoffeeScript 1.10.0
(function() {
  namespace("scene.bkg", function(exports) {
    var CREATE_STAR_CHANCE, MAX_STARS, createStarFieldArray, drawSky, drawStarField, ground, height, lowerThird, metrics, setupHasRun, width;
    MAX_STARS = 2000;
    CREATE_STAR_CHANCE = 75;
    width = 0;
    height = 0;
    lowerThird = 0;
    ground = 0;
    metrics = null;
    setupHasRun = false;
    exports.setup = function(ctx, m, c) {
      var colors;
      metrics = m;
      colors = c;
      return setupHasRun = true;
    };
    exports.render = function(ctx) {
      drawSky(ctx);
      return drawStarField(ctx);
    };
    drawSky = function(ctx) {
      var gradient, i, j, ref, results;
      results = [];
      for (i = j = 0, ref = metrics.height; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(metrics.width, i);
        if (i < metrics.ground) {
          ctx.strokeStyle = scene.utils.interpolateColor("AA0000", "000000", i, 200);
          ctx.stroke();
        }
        gradient = ctx.createLinearGradient(0, metrics.ground, 0, metrics.height);
        gradient.addColorStop(0, "#855055");
        gradient.addColorStop(1, "black");
        ctx.fillStyle = gradient;
        results.push(ctx.fillRect(0, metrics.ground, metrics.width, metrics.ground - 40));
      }
      return results;
    };
    drawStarField = function(ctx) {
      var j, len, ref, results, star;
      ref = createStarFieldArray(MAX_STARS);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        star = ref[j];
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1, 0, 2 * Math.PI, true);
        ctx.fillStyle = star.color;
        results.push(ctx.fill());
      }
      return results;
    };
    return createStarFieldArray = function(count) {
      var chance, color, i, starField, x, y;
      starField = [];
      i = 0;
      while (i < count) {
        chance = scene.utils.rand(0, 100) < CREATE_STAR_CHANCE;
        if (chance) {
          x = scene.utils.rand(0, metrics.width * 2);
          y = scene.utils.rand(0, metrics.ground);
          color = scene.utils.interpolateColor("000000", "FFFFFF", scene.utils.rand(0, 18), 2);
          starField.push(new Star(x, y, color));
        }
        i++;
      }
      return starField;
    };
  });

}).call(this);