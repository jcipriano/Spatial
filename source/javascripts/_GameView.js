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
};

/**
 * Initialize game view
 **/
Spatial.GameView.prototype.start = function() {
  // renderer
  this.renderer = new THREE.WebGLRenderer( { antialias: true } );
  this.renderer.setSize(this.width, this.height);
  this.domEl.append(this.renderer.domElement);
  
  // scene
  this.scene = new THREE.Scene();
  
  // camera
	this.camera = new THREE.PerspectiveCamera( 60, this.width / this.height, 1, 100000 );
	this.camera.position.z = this.cameraDistance ;
  
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
  var so = new Spatial.SpatialObject3D();
  this.group.add(so);
  this.scene.add(this.group);

  //var material = new THREE.MeshBasicMaterial({ color: 0xCC0000 });
  //var mesh = new THREE.Mesh(new THREE.CubeGeometry(10, 10, 10), material);
  //this.scene.add(mesh);
  
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
  
  //this.group.rotation.x = this.group.rotation.x + 0.01;
  this.group.rotation.y = this.group.rotation.y + 0.01;
  
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