Spatial.Room = function() {
  
  THREE.Object3D.call(this);
  
  this.build();
};

Spatial.Room.prototype = new THREE.Object3D();
Spatial.Room.prototype.constructor = Spatial.Room;
Spatial.Room.prototype.supr = THREE.Object3D.prototype;

Spatial.Room.prototype.build = function() {
  
	var skyBoxMaterial = new THREE.MeshPhongMaterial( { 
    color: 0x000000, 
    ambient: 0x000000,
    specular: 0xFFFFFF,
    shininess: 1,
    side: THREE.BackSide
  });
  
  this.cube = new THREE.Mesh(new THREE.CubeGeometry(400, 125, 500), skyBoxMaterial);
  
	this.add(this.cube);
};