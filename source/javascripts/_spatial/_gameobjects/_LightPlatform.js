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

  var material = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 0.10,
    transparent: true,
    opacity: 0
  });
  
  this.particleHolder = new THREE.Object3D();
  this.add(this.particleHolder);
    
  this.particleSystem = new THREE.ParticleSystem(this.particles,  material);
  this.particleSystem.visible = false;
  this.particleSystem.sortParticles = true;
  this.particleHolder.add(this.particleSystem);
};

Spatial.LightPlatform.prototype.on = function() {
  
  var time = 0.75; 
  
  // light lenses
  TweenLite.to(this.top.lensOn.material, time, { opacity: 0.85, ease: Elastic.easeIn });
  TweenLite.to(this.bottom.lensOn.material, time, { opacity: 0.85, ease: Elastic.easeIn });
  
  // lights
  TweenLite.to(this.top.light, time, { intensity: 0.75, ease: Elastic.easeIn });
  TweenLite.to(this.bottom.light, time, { intensity: 0.75, ease: Elastic.easeIn });
};

Spatial.LightPlatform.prototype.off = function(instant) {
  
  var obj = { intensity: 0, opacity: 0, ease: Quad.easeOut };
  var time = instant ? 0 : 0.75; 
  
  // light lenses
  TweenLite.to(this.top.lensOn.material, time, obj);
  TweenLite.to(this.bottom.lensOn.material, time, obj);
  
  // lights
  TweenLite.to(this.top.light, time, obj);
  TweenLite.to(this.bottom.light, time, obj);
};

Spatial.LightPlatform.prototype.render = function() {
  
  this.particleHolder.rotation.y = this.particleHolder.rotation.y - 0.006;
  
  $.each(this.particles.vertices, function(i, particle){
    if(particle.y > 120) { particle.y = 0; }
    particle.add(particle.velocity);
  });
  
  this.particleSystem.geometry.__dirtyVertices = true;

};

Spatial.LightPlatform.prototype.particleOn = function() {
  
  if(!this.particleSystem){
    this.particulate();
  }

  // light beams
  TweenLite.to(this.top.lightBeam.material, 0.75, { opacity: 0.5, ease: Quad.easeIn });
  TweenLite.to(this.bottom.lightBeam.material, 0.75, { opacity: 0.5, ease: Quad.easeIn });
  
  TweenLite.to(this.particleSystem.material, 0.5, {
    opacity: 0.85,
    ease: Linear.easeOut
  });
  
  this.particleSystem.visible = true;
  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
};

Spatial.LightPlatform.prototype.particleOff = function() {
  
  if(!this.particleSystem){
    return;
  }
  
  var time = 0.5;
  
  // light beams
  TweenLite.to(this.top.lightBeam.material, time, { intensity: 0, opacity: 0, ease: Quad.easeOut });
  TweenLite.to(this.bottom.lightBeam.material, time, { intensity: 0, opacity: 0, ease: Quad.easeOut });
  
  var that = this;
  TweenLite.to(this.particleSystem.material, time, {
    opacity: 0,
    ease: Linear.easeOut,
    onComplete: function(){
      that.particleSystem.visible = false;
      Spatial.game.events.remove(Spatial.Events.ENTERFRAME, that.render, that);
    }
  });
};

Spatial.LightPlatform.prototype.buildPlatForm = function(verticalFlip) {
  
  var mat = new THREE.MeshPhongMaterial( { 
    color: 0x222222, 
    ambient: 0x222222,
    specular: 0x666666,
    shininess: 1
  });
  
  var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(20, 23, 2, 20, 1, false), mat);
  
  var lightTarget = new THREE.Object3D();
  lightTarget.position.y = 100;
  cylinder.add(lightTarget);
  
  var light = new THREE.SpotLight(0xFFFFFF, 0);
  light.target = lightTarget;
  cylinder.add(light);
  
  
  var lensOn = new THREE.Mesh(new THREE.PlaneGeometry(45, 45, 2, 2), new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('images/textures/LightPlatform_on.png'),
    transparent: true,
    opacity: 0
  }));
  lensOn.position.y = 2;
  lensOn.rotation.x = Spatial.Util.toRads(-90);
  cylinder.add(lensOn);
  
  var lensOff = new THREE.Mesh(new THREE.PlaneGeometry(45, 45, 2, 2), new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('images/textures/LightPlatform_off.png'),
    transparent: true,
    opacity: 0.25
  }));
  lensOff.position.y = 2;
  lensOff.rotation.x = Spatial.Util.toRads(-90);
  cylinder.add(lensOff);
  
  
  var lightBeam = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.ImageUtils.loadTexture('images/textures/LightPlatform_beam.png'),
    useScreenCoordinates: false,
    color: 0xFFFFFF,
    transparent: true,
    opacity: 0,
    fog: true
  }));
  var scale = 120;
  //lightBeam.visible = false;
  lightBeam.scale.set(scale, verticalFlip ? -scale : scale, scale);
  lightBeam.position.y = 55;
  cylinder.add(lightBeam);
  
  
  return {
    platform: cylinder,
    light: light,
    lensOn: lensOn,
    lensOff: lensOff,
    lightBeam: lightBeam
  };
};