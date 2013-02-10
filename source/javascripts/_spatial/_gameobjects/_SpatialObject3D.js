Spatial.SpatialObject3D = function(length, size, autoBuild) {
  //console.log('Spatial.SpatialObject3D');
  
  THREE.Object3D.call(this);
  
  this.width = 0;
  this.height = 0;
  this.depth = 0;
  
  this.group;
  this.cubes;
  this.size = size;
  this.cubeLength = length;
  this.cubes = [];
  this.sides = [
    { side: "top", position: new THREE.Vector3( 0, this.size, 0 ) },
    { side: "bottom", position: new THREE.Vector3( 0, -this.size, 0 ) },
    { side: "front", position: new THREE.Vector3( 0, 0, this.size ) },
    { side: "back", position: new THREE.Vector3( 0, 0, -this.size ) },
    { side: "left", position: new THREE.Vector3( -this.size, 0, 0 ) },
    { side: "right", position: new THREE.Vector3( this.size, 0, 0 ) }
  ];
  
  if(autoBuild !== false) {
    this.build();
  }
};

Spatial.SpatialObject3D.prototype = new THREE.Object3D();
Spatial.SpatialObject3D.prototype.constructor = Spatial.SpatialObject3D;
Spatial.SpatialObject3D.prototype.supr = THREE.Object3D.prototype;

Spatial.SpatialObject3D.prototype.build = function(cubes) {
  
  this.group = new THREE.Object3D();
  this.add(this.group);
  
  var mesh;
  var lastMesh;
  var i = 0;
  
  var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  
  // cloning?
  if(cubes){
    console.log('building clone');
    
    i = cubes.length;
    while(i--) {
      mesh = cubes[i].clone(color);
      this.group.add(mesh);
      this.cubes.push(mesh);
    }
    
    return;
  };
  
  // resume default build
  for(i; i<this.cubeLength; i++){
    mesh = new Spatial.SpatialCubeMesh(color, this.size);
    
    if(lastMesh){
      var emptyPos = this.getEmptyPositions(lastMesh.position);
      var side = emptyPos[Math.floor(Math.random() * emptyPos.length)];
      mesh.position = side.position;
    }
    
    this.group.add(mesh);
    this.cubes.push(mesh);
    lastMesh = mesh;
  }
  
  this.center();
};

Spatial.SpatialObject3D.prototype.center = function() {
  
  var i = this.cubes.length;
  var cube;
  var minX = 0, maxX = 0, minY = 0, maxY = 0, minZ = 0, maxZ = 0;
  while(i--) {
    cube = this.cubes[i];
    
    minX = cube.position.x < minX ? cube.position.x : minX;
    maxX = cube.position.x > maxX ? cube.position.x : maxX;
  
    minY = cube.position.y < minY ? cube.position.y : minY;
    maxY = cube.position.y > maxY ? cube.position.y : maxY;
    
    minZ = cube.position.z < minZ ? cube.position.z : minZ;
    maxZ = cube.position.z > maxZ ? cube.position.z : maxZ;
  }
  
  this.width = maxX - minX;
  var offsetX = (this.width / 2) - Math.abs(minX);
  
  this.height = maxY - minY;
  var offsetY = (this.height / 2) - Math.abs(minY);
  
  this.depth = maxZ - minZ;
  var offsetZ = (this.depth / 2) - Math.abs(minZ);
  
  var offsetPos = new THREE.Vector3(-offsetX, -offsetY, -offsetZ);
  
  i = this.cubes.length;
  while(i--) {
    cube = this.cubes[i];
    cube.position.add(offsetPos);
  }
};

Spatial.SpatialObject3D.prototype.showWireframe = function() {
  
  var i = this.cubes.length;
  var cube;
  while(i--) {
    cube = this.cubes[i];
    cube.showWireframe();
  }
};

Spatial.SpatialObject3D.prototype.getEmptyPositions = function(position) {
  
  var availPos = [];
  
  var x = 0;
  for(x; x<6; x++){
    var tgtPos = position.clone();
    var side = this.sides[x];
    tgtPos.add(side.position);
      
    var y = 0;
    if(!this.hasCubeAtPosition(tgtPos)){
      availPos.push({ side: side.side, position: tgtPos });
    }
  }
  
  return availPos;
};

Spatial.SpatialObject3D.prototype.hasCubeAtPosition = function(position) {

  var i = 0;
  var len = this.cubes.length;
  for(i; i<len; i++){
    if(position.equals(this.cubes[i].position)){
      return true;
    }
  }
  
  return false;
};

Spatial.SpatialObject3D.prototype.clone = function() {
  var so = new Spatial.SpatialObject3D(this.cubeLength, this.size, false);
  so.build(this.cubes);
  return so;
};