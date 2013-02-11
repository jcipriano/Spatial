Spatial.ParticleSystem = function(length, size, autoBuild) {
  
  THREE.Object3D.call(this);
  
  this.particles = new THREE.Geometry();
  
  var pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xFFFFFF,
    size: 0.2,
    transparent: true,
    opacity: 1
  });

  for(var i = 0; i < 100 * 2; i++){
    var pX = Math.random() * 50 - 25;
    var pY = Math.random() * 50 - 25;
    var pZ = Math.random() * 50 - 25;

    var particle = new THREE.Vector3(pX, pY, pZ);
    particle.velocity = new THREE.Vector3(0, 0.075, 0);  
    particle.setLength(particle.length());
    this.particles.vertices.push(particle);
  }

  // create the particle system
  this.particleSystem = new THREE.ParticleSystem(this.particles,  pMaterial);
  this.particleSystem.sortParticles = true;
  this.particleGroup = new THREE.Object3D();
  this.add(this.particleGroup);
  this.particleGroup.add(this.particleSystem);
};

Spatial.ParticleSystem.prototype = new THREE.Object3D();
Spatial.ParticleSystem.prototype.constructor = Spatial.ParticleSystem;
Spatial.ParticleSystem.prototype.supr = THREE.Object3D.prototype;

Spatial.ParticleSystem.prototype.onRender = function() {
  // move particles
  $.each(this.particles.vertices, function(i, particle){
    if(particle.y > 25) {
      particle.y = -25;
    }
    particle.add(particle.velocity);
  });
  this.particleSystem.geometry.__dirtyVertices = true;
    
  this.particleGroup.rotation.y = this.particleGroup.rotation.y + 0.005;
};