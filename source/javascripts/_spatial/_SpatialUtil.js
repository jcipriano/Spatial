Spatial.Util = {};

Spatial.Util.shuffle = function(ary) {
  for(var j, x, i = ary.length; i; j = parseInt(Math.random() * i), x = ary[--i], ary[i] = ary[j], ary[j] = x);
  return ary;
};