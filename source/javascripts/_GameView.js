Spatial.GameView = function(el) {
  console.log('Spatial.GameView');
  
  this.domEl = $(el);
  
  this.height = 500;
  this.width = 500;
  this.cameraDistance = 150;
  
  this.renderer;
  this.domEl;
  this.camera;
  this.scene;
  
  this.spatialObjs;
};

/**
 * Initialize game view
 **/
Spatial.GameView.prototype.start = function() {
  // renderer
  this.renderer = new THREE.WebGLRenderer( { antialias: true } );
  this.renderer.setSize(this.width, this.height);
  this.renderer.physicallyBasedShading = true;
  this.domEl.append(this.renderer.domElement);
  
  // scene
  this.scene = new THREE.Scene();
  
  // camera
	this.camera = new THREE.PerspectiveCamera( 60, this.width / this.height, 1, 100000 );
	this.camera.setLens(85, 35);
	this.camera.position.z = this.cameraDistance ;
  
  // light
  var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(100, 0, 200).normalize();
  this.scene.add(directionalLight);
  
  // window resize
  var that = this;
  window.addEventListener('resize', function(e){
	  that.onWindowResized(e);
  }, false );
	this.onWindowResized(null);
  
  this.buildSpatialObjs();
  
  // render
  this.renderLoop();
};

/**
 * Render spatial objects
 **/
Spatial.GameView.prototype.buildSpatialObjs = function() {
  console.log('Spatial.GameView.prototype.renderSpatialObjs');
  
  this.group = new THREE.Object3D();
  this.scene.add(this.group);
  
  this.spatialObjs = [];
  
  var so1 = new Spatial.SpatialObject3D();
  so1.position.x = -75;
  this.group.add(so1);
  this.spatialObjs.push(so1);
  
  var so2 = new Spatial.SpatialObject3D();
  so2.position.x = 0;
  this.group.add(so2);
  this.spatialObjs.push(so2);
  
  var so3 = new Spatial.SpatialObject3D();
  so3.position.x = 75;
  this.group.add(so3);
  this.spatialObjs.push(so3);
};

/**
 * Rendering loop
 **/
Spatial.GameView.prototype.renderLoop = function() {
  
  this.render();
  
  var that = this;
  window.requestAnimationFrame(function(){
    that.renderLoop();
  });
};

/**
 * Render
 **/
Spatial.GameView.prototype.render = function() {
  
  //this.group.rotation.x = this.group.rotation.x + 0.003;
  //this.group.rotation.y = this.group.rotation.y + 0.01;
  var i = this.spatialObjs.length;
  var spatialObj;
  while(i--) {
    spatialObj = this.spatialObjs[i];
    spatialObj.rotation.x = spatialObj.rotation.x + 0.01;
    spatialObj.rotation.y = spatialObj.rotation.y + 0.001;
  }
  
  
  // render
  this.renderer.render(this.scene, this.camera);
};

/**
 * Window resize
 **/
Spatial.GameView.prototype.onWindowResized = function( event ) {
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.camera.projectionMatrix.makePerspective( 50, window.innerWidth / window.innerHeight, 1, 1100 );
}