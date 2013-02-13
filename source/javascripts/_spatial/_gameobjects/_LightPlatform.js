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
  
	this.top = this.buildPlatForm(true);
  this.top.platform.position.y = 121;
  this.top.platform.rotation.y = Spatial.Util.toRads(180);
  this.top.platform.rotation.x = Spatial.Util.toRads(180);
  this.add(this.top.platform);
  
  this.particulate();
};
Spatial.LightPlatform.prototype.particulate = function() {

  this.particles = new THREE.Geometry();
  var len = 100;
  while(len--){
    var pX = Math.random() * 25 - 12;
    var pY = Math.random() * 120;
    var pZ = Math.random() * 25 - 12;
    
    var particle = new THREE.Vector3(pX, pY, pZ);
    particle.velocity = new THREE.Vector3(0, 0.5, 0);  
    particle.setLength(particle.length());
    this.particles.vertices.push(particle);
  }
  

  var pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 0.10,
    transparent: true,
    opacity: 0.65
  });
  
  this.particleHolder = new THREE.Object3D();
  this.add(this.particleHolder);
    
  this.particleSystem = new THREE.ParticleSystem(this.particles,  pMaterial);
  this.particleSystem.sortParticles = true;
  this.particleHolder.add(this.particleSystem);

  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
};

Spatial.LightPlatform.prototype.render = function() {
  
  this.particleHolder.rotation.y = this.particleHolder.rotation.y - 0.005
  
  $.each(this.particles.vertices, function(i, particle){
    if(particle.y > 120) { particle.y = 0; }
    particle.add(particle.velocity);
  });
  
  this.particleSystem.geometry.__dirtyVertices = true;
};

Spatial.LightPlatform.prototype.buildPlatForm = function(verticalFlip) {
  
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

	var beamTexture = new THREE.ImageUtils.loadTexture('images/textures/LightPlatform_beam.png');
  var beamMat = new THREE.SpriteMaterial({ map: beamTexture, useScreenCoordinates: false, color: 0xFFFFFF, opacity: 0.75, fog: true});
  var sprite = new THREE.Sprite(beamMat);
  var scale = 120;
  sprite.scale.set(scale, verticalFlip ? -scale : scale, scale);
  sprite.position.y = 55;
  cylinder.add(sprite);
  
  return { platform: cylinder, material: lightMat, light: light};
};