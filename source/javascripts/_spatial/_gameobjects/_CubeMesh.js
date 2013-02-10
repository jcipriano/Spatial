Spatial.CubeMesh = function(color, size) {
  
  this.color = color;
  this.size = size;
  
  this.geometry = new Spatial.CubeGeometry(size, size, size);
  this.material = new THREE.MeshPhongMaterial( { 
    color: color, 
    ambient: color,
    specular: 0xFFFFFF,
    shininess: 2
  });
  
  THREE.Mesh.call(this, this.geometry, this.material);
  
  this.wireframe;
};

Spatial.CubeMesh.prototype = new THREE.Mesh();
Spatial.CubeMesh.prototype.constructor = Spatial.CubeMesh;
Spatial.CubeMesh.prototype.supr = THREE.Mesh.prototype;

Spatial.CubeMesh.prototype.showWireframe = function() {
  
  var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, wireframeLinewidth: 1 }); 
  
  this.wireframe = new THREE.Mesh(new THREE.CubeGeometry(this.geometry.width, this.geometry.height, this.geometry.depth), material);
  this.add(this.wireframe);
};

Spatial.CubeMesh.prototype.clone = function(color) {
  var cube = new Spatial.CubeMesh(color ? color : this.color, this.size);
  cube.position = this.position.clone();
  return cube;
};