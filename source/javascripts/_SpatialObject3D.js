Spatial.SpatialObject3D = function() {
  console.log('Spatial.SpatialObject3D');
  
  THREE.Object3D.call( this );
  
  this.group;
  this.cubes;
  this.size = 10;
  this.cubeLength = 4;
  this.cubes = [];
  this.sides = [
    { side: "top", position: new THREE.Vector3( 0, this.size, 0 ) },
    { side: "bottom", position: new THREE.Vector3( 0, -this.size, 0 ) },
    { side: "front", position: new THREE.Vector3( 0, 0, this.size ) },
    { side: "back", position: new THREE.Vector3( 0, 0, -this.size ) },
    { side: "left", position: new THREE.Vector3( -this.size, 0, 0 ) },
    { side: "right", position: new THREE.Vector3( this.size, 0, 0 ) }
  ];
  this.build();
};

Spatial.SpatialObject3D.prototype = new THREE.Object3D();
Spatial.SpatialObject3D.prototype.constructor = Spatial.SpatialObject3D;
Spatial.SpatialObject3D.prototype.supr = THREE.Object3D.prototype;

Spatial.SpatialObject3D.prototype.build = function() {
  
  console.log(this);
  
  this.group = new THREE.Object3D();
  this.add(this.group);

  var material = new THREE.MeshBasicMaterial({ color: 0xCC0000, wireframe: true });
  
  var mesh;
  var lastMesh;
  var i = 0;
  for(i; i<this.cubeLength; i++){
    mesh = new THREE.Mesh(new THREE.CubeGeometry(this.size, this.size, this.size), material);
    
    if(lastMesh){
      var emptyPos = this.getEmptyPositions(lastMesh.position);
      var side = emptyPos[Math.floor(Math.random()*emptyPos.length)];
      mesh.position = side.position;
    }
    
    this.group.add(mesh);
    this.cubes.push(mesh);
    lastMesh = mesh;
  }
  
  console.log(this.cubes.length);
};

Spatial.SpatialObject3D.prototype.getEmptyPositions = function(position) {
  
  var availPos = [];
  
  var x = 0;=
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