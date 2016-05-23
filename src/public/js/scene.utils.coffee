namespace "scene.utils", (exports) ->

  exports.rand = (min, max) ->
    parseInt(Math.random() * (max - min + 1), 10) + min

  #from http://snipplr.com/view.php?codeview&id=19601
  exports.interpolateColor = (minColor, maxColor, maxDepth, depth) ->
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
