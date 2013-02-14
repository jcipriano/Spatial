Spatial.Structure = function(length, size, autoBuild) {
  
  THREE.Object3D.call(this);
  
  this.events = new Spatial.EventPublisher();
  this.particleSystem;
  this.width = 0;
  this.height = 0;
  this.depth = 0;
  this.selected = false;
  this.cubeGroup;
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
    this.generate();
  }
};

Spatial.Structure.prototype = new THREE.Object3D();
Spatial.Structure.prototype.constructor = Spatial.Structure;
Spatial.Structure.prototype.supr = THREE.Object3D.prototype;

Spatial.Structure.prototype.generate = function(cubes) {
  
  this.cubeGroup = new THREE.Object3D();
  this.add(this.cubeGroup);
  
  var mesh;
  var lastMesh;
  var i = 0;
  
  var color = Spatial.Util.randHex();
  
  // cloning?
  if(cubes){
    i = cubes.length;
    while(i--) {
      mesh = cubes[i].clone(color, this);
      this.cubeGroup.add(mesh);
      this.cubes.push(mesh);
      Spatial.game.model.addUiMesh(mesh);
    }
  }
  
  // default build
  else{
    
    i = this.cubeLength;
    while(i--) {
      mesh = new Spatial.CubeMesh(color, this.size, this);
    
      if(lastMesh){
        var emptyPos = this.getEmptyPositions(lastMesh.position);
        var side = Spatial.Util.randVal(emptyPos);
        mesh.position = side.position;
      }
    
      this.cubeGroup.add(mesh);
      this.cubes.push(mesh);
      Spatial.game.model.addUiMesh(mesh);
      lastMesh = mesh;
    }
  
    // randomly orient structure
    var degs = [
      Spatial.Util.toRads(0),
      Spatial.Util.toRads(90),
      Spatial.Util.toRads(180),
      Spatial.Util.toRads(270)
    ];
    this.cubeGroup.rotation = new THREE.Vector3(Spatial.Util.randVal(degs), Spatial.Util.randVal(degs), Spatial.Util.randVal(degs));
  
    this.center();
  }
  
  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
};

Spatial.Structure.prototype.degenerate = function () {
  
  var i = this.cubeLength;
  var mesh;
  while(i--) {
    mesh = this.cubes[i]
    Spatial.game.model.removeUiMesh(mesh);
  }
};

Spatial.Structure.prototype.center = function() {
  
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

Spatial.Structure.prototype.showWireframe = function() {
  
  var i = this.cubes.length;
  var cube;
  while(i--) {
    cube = this.cubes[i];
    cube.showWireframe();
  }
};

Spatial.Structure.prototype.getEmptyPositions = function(position) {
  
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

Spatial.Structure.prototype.hasCubeAtPosition = function(position) {

  var i = 0;
  var len = this.cubes.length;
  for(i; i<len; i++){
    if(position.equals(this.cubes[i].position)){
      return true;
    }
  }
  
  return false;
};

Spatial.Structure.prototype.clone = function() {
  var so = new Spatial.Structure(this.cubeLength, this.size, false);
  so.generate(this.cubes);
  return so;
};

Spatial.Structure.prototype.equals = function(structure) {
  
  if(this.cubes.length != structure.cubes.length){
    return false;
  }
  
  var i = structure.cubes.length;
  var cube;
  while(i--) {
    cube = structure.cubes[i];
    if(!this.hasCubeAtPosition(cube.position)){
     return false;
    }
  }

  return true;
};

Spatial.Structure.prototype.render = function() {
  this.cubeGroup.rotation.x = this.cubeGroup.rotation.x + 0.005;
  this.cubeGroup.rotation.y = this.cubeGroup.rotation.y + 0.005;
};

Spatial.Structure.prototype.onClick = function(obj) {
  if(this.selected){
    this.deselect(obj);
  }else{
    this.select(obj);
  }
};

Spatial.Structure.prototype.select = function(obj) {
  this.selected = true;
  
  TweenLite.to(this.position, 7, {
    y: 20,
    ease: Elastic.easeOut
  });
  
  this.events.publish(Spatial.Events.SELECTED, { target: this, data: obj });
};

Spatial.Structure.prototype.deselect = function(obj) {
  this.selected = false;
  
  TweenLite.to(this.position, 4, {
    y: 0,
    ease: Elastic.easeOut
  });
  
  this.events.publish(Spatial.Events.DESELECTED, { target: this, data: obj });
};