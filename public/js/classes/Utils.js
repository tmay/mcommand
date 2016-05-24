class Utils {
  static rand(min, max) {
    return parseInt(Math.random() * (max - min + 1), 10) + min;
  }
  static interpolateColor (minColor, maxColor, maxDepth, depth) {
    var color, d2h, h2d, i, maxVal, minVal, nVal, val;
    d2h = function(d) {
      return d.toString(16);
    };
    h2d = function(h) {
      return parseInt(h, 16);
    };
    if (depth === 0) {
      return minColor;
    }
    if (depth === maxDepth) {
      return maxColor;
    }
    color = "#";
    i = 1;
    while (i <= 6) {
      minVal = new Number(h2d(minColor.substr(i, 2)));
      maxVal = new Number(h2d(maxColor.substr(i, 2)));
      nVal = minVal + (maxVal - minVal) * (depth / maxDepth);
      val = d2h(Math.floor(nVal));
      while (val.length < 2) {
        val = "0" + val;
      }
      color += val;
      i += 2;
    }
    return color;
  };

  static generateColorList(len) {
    var colors = new Array(len);
    for (var i=0; i<len;i++) {
      var rnd =  Utils.rand(0,100);
      var color = Utils.interpolateColor("#ff2334", "#FFFFFF", rnd, 3);
      colors.push (color);
    }
    return colors;
  }
}
