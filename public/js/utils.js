// Generated by CoffeeScript 1.10.0
(function() {
  var slice = [].slice;

  window.namespace = function(target, name, block) {
    var i, item, len, ref, ref1, top;
    if (arguments.length < 3) {
      ref = [(typeof exports !== 'undefined' ? exports : window)].concat(slice.call(arguments)), target = ref[0], name = ref[1], block = ref[2];
    }
    top = target;
    ref1 = name.split('.');
    for (i = 0, len = ref1.length; i < len; i++) {
      item = ref1[i];
      target = target[item] || (target[item] = {});
    }
    return block(target, top);
  };

}).call(this);
