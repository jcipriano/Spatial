Spatial.GameView = function(el) {
  console.log('Spatial.GameView');
  
  this.domEl = $(el);
  this.cameraDistance = 200;
  
  this.effectsView;
  
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
  this.renderer.setSize(Spatial.game.viewport.width, Spatial.game.viewport.height);
  this.renderer.physicallyBasedShading = true;
	this.renderer.autoClear = false;
  this.domEl.append(this.renderer.domElement);
  
  // scene
  this.scene = new THREE.Scene();
  
  // camera
	this.camera = new THREE.PerspectiveCamera( 60, Spatial.game.viewport.aspectRatio, 1, 100000 );
	this.camera.position.y = 0
	this.camera.position.x = 0
	this.camera.position.z = this.cameraDistance;
	this.camera.lookAt(new THREE.Vector3(0,0,0));
  
  // projector
  this.projector = new THREE.Projector();
  
  // room
  this.room = new Spatial.Room();
	this.scene.add(this.room);
  this.renderObjects.push(this.room);
  
  // strcutures
  this.structureGroup = new Spatial.StructureGroup(5);
  this.scene.add(this.structureGroup);
  this.renderObjects.push(this.structureGroup);
  
  // events
  Spatial.game.events.add(Spatial.Events.CLICK, this.onMouseClick, this);
  Spatial.game.events.add(Spatial.Events.MOVE, this.onMouseMove, this);
  Spatial.game.events.add(Spatial.Events.RESIZE, this.onWindowResized, this);
  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
  
  // start
  this.onWindowResized(Spatial.game.viewport);
  this.render();
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
      renderObj.onRender(this.camera.position);
    }
  }
  
  // camera
  this.camera.lookAt(this.scene.position);
	
  // render
  this.renderer.render(this.scene, this.camera);
};

/**
 * Window resize
 **/
Spatial.GameView.prototype.onWindowResized = function(data) {
	this.renderer.setSize(data.width,  data.height);
	this.camera.projectionMatrix.makePerspective( 60, data.width/data.height, 1, 1100 );
};

/**
 * Mouse move
 **/
Spatial.GameView.prototype.onMouseMove = function(data) {
  TweenLite.to(this.camera.position, 1, { x: 225 * data.xP, y: -20 * data.yP, ease: Quad.easeOut }); 
};

/**
 * Mouse click
 **/
Spatial.GameView.prototype.onMouseClick = function(data) {

  var vector = new THREE.Vector3((data.x / Spatial.game.viewport.width) * 2 - 1, -(data.y / Spatial.game.viewport.height) * 2 + 1, 0.5);
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