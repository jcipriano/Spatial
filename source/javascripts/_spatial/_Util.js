Spatial.Util = {};

Spatial.Util.shuffle = function(ary) {
  for(var j, x, i = ary.length; i; j = parseInt(Math.random() * i), x = ary[--i], ary[i] = ary[j], ary[j] = x);
  return ary;
};

Spatial.Util.toRads = function(degs) {
  return degs * (Math.PI/180);
};

Spatial.Util.toDegs = function(rads) {
  return rads * (180/Math.PI)
};

Spatial.Util.randVal = function(ary) {
  return ary[Spatial.Util.randInt(0, ary.length-1)];
}

Spatial.Util.randInt = function(min, max) {
  return min + Math.floor((Math.random() * max + 1));
};

Spatial.Util.randHex = function() {
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
};