Spatial.SpatialCubeMesh = function(color, size) {
  
  this.color = color;
  this.size = size;
  
  this.geometry = new Spatial.SpatialCubeGeometry(size, size, size);
  this.material = new THREE.MeshPhongMaterial( { 
    color: color, 
    ambient: color,
    specular: 0xFFFFFF,
    shininess: 2
  });
  
  THREE.Mesh.call(this, this.geometry, this.material);
  
  this.wireframe;
};

Spatial.SpatialCubeMesh.prototype = new THREE.Mesh();
Spatial.SpatialCubeMesh.prototype.constructor = THREE.SpatialCubeMesh;
Spatial.SpatialCubeMesh.prototype.supr = THREE.Mesh.prototype;

Spatial.SpatialCubeMesh.prototype.showWireframe = function() {
  
  var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 1 }); 
  
  this.wireframe = new THREE.Mesh(new THREE.CubeGeometry(this.geometry.width, this.geometry.height, this.geometry.depth), material);
  this.add(this.wireframe);
};

Spatial.SpatialCubeMesh.prototype.clone = function(color) {
  var cube = new Spatial.SpatialCubeMesh(color ? color : this.color, this.size);
  cube.position = this.position.clone();
  return cube;
};