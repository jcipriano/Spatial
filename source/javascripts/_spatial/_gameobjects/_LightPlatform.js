Spatial.LightPlatform = function() {
  
  THREE.Object3D.call(this);
  
  this.bottom;
  this.top;
  
  this.build();
};

Spatial.LightPlatform.prototype = new THREE.Object3D();
Spatial.LightPlatform.prototype.constructor = Spatial.LightPlatform;
Spatial.LightPlatform.prototype.supr = THREE.Object3D.prototype;

Spatial.LightPlatform.prototype.build = function() {
  
	this.bottom = this.buildPlatForm();
  this.bottom.platform.position.y = -1;
  this.add(this.bottom.platform);
  
	this.top = this.buildPlatForm();
  this.top.platform.position.y = 121;
  this.top.platform.rotation.y = Spatial.Util.toRads(180);
  this.top.platform.rotation.x = Spatial.Util.toRads(180);
  this.add(this.top.platform);
};

Spatial.LightPlatform.prototype.buildPlatForm = function() {
  
  var mat = new THREE.MeshPhongMaterial( { 
    color: 0x222222, 
    ambient: 0x222222,
    specular: 0x666666,
    shininess: 5
  });
  
  var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(20, 23, 2, 20, 1, false), mat);
  
  var lightTarget = new THREE.Object3D();
  lightTarget.position.y = 100;
  cylinder.add(lightTarget);
  
  var light = new THREE.SpotLight(0xFFFFFF, 0.75);
  light.target = lightTarget;
  cylinder.add(light);

	var texture = THREE.ImageUtils.loadTexture('images/textures/LightPlatform_on.png');
	var lightMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1 });
  var plane = new THREE.Mesh(new THREE.PlaneGeometry(45, 45, 2, 2), lightMat);
  plane.position.y = 2;
  plane.rotation.x = Spatial.Util.toRads(-90);
  cylinder.add(plane);

	var beamTexture = THREE.ImageUtils.loadTexture('images/textures/LightPlatform_beam.png');
  var beamMat = new THREE.SpriteMaterial({ map: beamTexture, useScreenCoordinates: true});
  var sprite = new THREE.Sprite(beamMat);
  sprite.position.y = 25;
  cylinder.add(sprite);
  
  return { platform: cylinder, material: lightMat, light: light};
};