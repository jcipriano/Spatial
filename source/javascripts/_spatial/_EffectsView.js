Spatial.EffectsView = function() {
	this.scene = new THREE.Scene();
	this.scene.add(new THREE.AmbientLight(0xFFFFFF));
	this.camera = new THREE.PerspectiveCamera(60, Spatial.game.viewport.aspectRatio, 1, 100000);
};

Spatial.EffectsView.prototype.onRender = function(camPos) {
  this.camera.position = camPos;
};