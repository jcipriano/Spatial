Spatial.CubeMesh = function(color, size, context) {
  
  this.color = color;
  this.size = size;
  this.context = context;
  
  var geo = new Spatial.CubeGeometry(size, size, size);
  var mat = new THREE.MeshPhongMaterial( { 
    color: color, 
    ambient: color,
    specular: 0xFFFFFF,
    //shininess: 25,
    transparent: true,
    opacity: 0.0
  });
  
  THREE.Mesh.call(this, geo, mat);
  
  this.wireframe;
};

Spatial.CubeMesh.prototype = new THREE.Mesh();
Spatial.CubeMesh.prototype.constructor = Spatial.CubeMesh;
Spatial.CubeMesh.prototype.supr = THREE.Mesh.prototype;

Spatial.CubeMesh.prototype.show = function(delay) {
  TweenLite.to(this.material, 0.5, { delay: 1 + delay, opacity: 1, ease: Elastic.easeIn });
};

Spatial.CubeMesh.prototype.showWireframe = function() {
  
  var material = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true, wireframeLinewidth: 1, opacity: 1, transparent: true }); 
  
  this.wireframe = new THREE.Mesh(new THREE.CubeGeometry(this.geometry.width, this.geometry.height, this.geometry.depth), material);
  this.add(this.wireframe);
};

Spatial.CubeMesh.prototype.clone = function(color, context) {
  var cube = new Spatial.CubeMesh(color ? color : this.color, this.size, context);
  cube.position = this.position.clone();
  return cube;
};