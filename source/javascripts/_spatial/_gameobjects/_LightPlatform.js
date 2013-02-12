Spatial.LightPlatform = function() {
  
  THREE.Object3D.call(this);
  
  this.cylBot;
  this.cylTop;
  this.lightTop;
  this.lightBot;
  this.pointlight;
  this.build();
};

Spatial.LightPlatform.prototype = new THREE.Object3D();
Spatial.LightPlatform.prototype.constructor = Spatial.LightPlatform;
Spatial.LightPlatform.prototype.supr = THREE.Object3D.prototype;

Spatial.LightPlatform.prototype.build = function() {
	
  var mat = new THREE.MeshPhongMaterial( { 
    color: 0x000000, 
    ambient: 0x000000,
    specular: 0xFFFFFF,
    shininess: 1
  });

  this.cylTop = new THREE.Mesh(new THREE.CylinderGeometry(23, 20, 2, 20, 1, false), mat);
  this.cylTop.position.y = 120;
  this.add(this.cylTop);
  
  this.cylBot = new THREE.Mesh(new THREE.CylinderGeometry(20, 23, 2, 20, 1, false), mat);
  this.cylBot.position.y = 0;
  this.add(this.cylBot);
  
  this.lightTop = new THREE.SpotLight(0xFFFFFF, 0.5);
  this.lightTop.position.set(0, 120, 0);
  this.lightTop.target = this.cylBot;
  //this.add(this.lightTop);
  
  this.lightBot = new THREE.SpotLight(0xFFFFFF, 0.5);
  this.lightBot.position.set(0, 0, 0);
  this.lightBot.target = this.cylTop;
  this.add(this.lightBot);
  
  //this.pointlight = new THREE.PointLight( 0xFFFFFF, 0.20, 0 );
  //this.pointlight.position.set(0, 20, 0);
  //this.add(this.pointlight);
};