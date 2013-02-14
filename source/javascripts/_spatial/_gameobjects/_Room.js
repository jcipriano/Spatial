Spatial.Room = function() {
  
  THREE.Object3D.call(this);

  this.platforms = [];
  
  this.build();
};

Spatial.Room.prototype = new THREE.Object3D();
Spatial.Room.prototype.constructor = Spatial.Room;
Spatial.Room.prototype.supr = THREE.Object3D.prototype;

Spatial.Room.prototype.build = function() {
  
	var mat = new THREE.MeshPhongMaterial( { 
    color: 0x000000, 
    ambient: 0x000000,
    specular: 0xFFFFFF,
    shininess: 1,
    side: THREE.BackSide
  });
  
  this.cube = new THREE.Mesh(new THREE.CubeGeometry(400, 125, 500), mat);
  this.cube.position.z = 100;
	this.add(this.cube);
  
  this.light = new THREE.PointLight( 0xFFFFFF, 0.20, 0 );
  this.light.position.set(0, 0, 200);
  this.add(this.light);

  var platform;
  var i = 5;
  while(i--){
    platform = new Spatial.LightPlatform();
    platform.position.y = -60;
    this.add(platform);
    this.platforms.push(platform);
  }
  
  // lay them out
  var width = 250;
  var spacing = width / (this.platforms.length - 1);
  var startX = 0 - width / 2;
  i = 0, len = this.platforms.length;
  for(i; i<len; i++) {
    platform = this.platforms[i];
    platform.position.x = startX + spacing * i;
  }
  
  this.platformSets = [];
  this.platformSets[1] = [this.platforms[2]];
  this.platformSets[3] = [this.platforms[1], this.platforms[2], this.platforms[3]];
  this.platformSets[5] = [this.platforms[0], this.platforms[1], this.platforms[2], this.platforms[3], this.platforms[4]];
  
  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
};

Spatial.Room.prototype.activate = function(length) {
  this.activePlatformSet = this.platformSets[length];
  var i = this.activePlatformSet.length;
  while(i--){
    this.activePlatformSet[i].on();
  }
  return this.activePlatformSet;
};

Spatial.Room.prototype.render = function(camPos) {
  //this.light.position = camPos;
};