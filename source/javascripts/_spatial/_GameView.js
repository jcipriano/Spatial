Spatial.GameView = function(el) {
  console.log('Spatial.GameView');
  
  this.domEl = $(el);
  
  this.height = $(window).height;
  this.width = height = $(window).width;
  this.cameraDistance = 150;
  
  this.renderer;
  this.domEl;
  this.camera;
  this.scene;
  this.projector;
  
  this.renderObjects = [];
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
	//this.camera.setLens(85, 35);
	this.camera.position.y = 0
	this.camera.position.x = 0
	this.camera.position.z = this.cameraDistance;
	this.camera.lookAt(new THREE.Vector3(0,0,0));
  
  // projector
  this.projector = new THREE.Projector();
  
  // lights
  //var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  //directionalLight.position.set(0, 0, 100);//.normalize();
  //this.scene.add(directionalLight);
  
  var light = new THREE.PointLight( 0xFFFFFF, 1, 0 );
  light.position.set(0, 0, 25);
  this.scene.add( light );
  
  this.room = new Spatial.Room();
  this.room.position.z = 100;
	this.scene.add(this.room);
  this.renderObjects.push(this.room);
  
  this.structureGroup = new Spatial.StructureGroup(5);
  this.scene.add(this.structureGroup);
  this.renderObjects.push(this.structureGroup);
  
  // render
  this.renderLoop();
  
  // events
  var that = this;
  
  $(window).resize(function(event){
    that.onWindowResized(event);
  });
	this.onWindowResized(null);
  
  $(window).mousemove(function(event){
    that.onMouseMove(event);
  });
  
  $(window).click(function(event){
    that.onMouseClick(event);
  });
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
  
  this.structureGroup.onRender();
  
  var i = this.renderObjects.length;
  var renderObj;
  while(i--) {
    renderObj = this.renderObjects[i];
    if(renderObj.onRender){
      renderObj.onRender();
    }
  }
  
  // camera
  this.camera.lookAt(new THREE.Vector3(0,0,0));
	
  // render
  this.renderer.render(this.scene, this.camera);
};

/**
 * Window resize
 **/
Spatial.GameView.prototype.onWindowResized = function(event) {
  this.winWidth = window.innerWidth;
  this.winHeight = window.innerHeight;
	this.renderer.setSize( this.winWidth,  this.winHeight);
	this.camera.projectionMatrix.makePerspective( 60, this.winWidth / this.winHeight, 1, 1100 );
}

/**
 * Mouse move
 **/
Spatial.GameView.prototype.onMouseMove = function(event) {
  TweenLite.to(this.camera.position, 1, {
    x: 150 * (event.x - this.winWidth / 2) / (this.winWidth / 2),
    y: -50 * (event.y - this.winHeight / 2) / (this.winHeight / 2),
    ease: Quad.easeOut
  }); 
}

/**
 * Mouse click
 **/
Spatial.GameView.prototype.onMouseClick = function(event) {
  event.preventDefault();

  var vector = new THREE.Vector3((event.clientX / this.winWidth) * 2 - 1, -(event.clientY / this.winHeight) * 2 + 1, 0.5);
  this.projector.unprojectVector(vector, this.camera);

  var raycaster = new THREE.Raycaster(this.camera.position, vector.sub( this.camera.position ).normalize());
  var intersects = raycaster.intersectObjects(Spatial.game.model.structureMeshes);

  if(intersects.length) {
    var obj = intersects[0];
    if(obj.object.context && obj.object.context.onClick){
      obj.object.context.onClick(obj);
    }
  }
};