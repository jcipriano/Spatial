Spatial.EffectsView = function(gameView) {
  
  this.gameView = gameView;
	this.scene;
	this.camera;
  
  this.build();
};

Spatial.EffectsView.prototype.build = function() {
	
  this.scene = new THREE.Scene();
	this.scene.add(new THREE.AmbientLight(0xFFFFFF));
	this.camera = new THREE.PerspectiveCamera(60, Spatial.game.viewport.aspectRatio, 1, 100000);
	
  var renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBufer: false };
	var renderTargetGlow = new THREE.WebGLRenderTarget( Spatial.game.viewport.width, Spatial.game.viewport.height, renderTargetParameters );
	
  var effectFXAA = new THREE.ShaderPass(THREE.ShaderExtras["fxaa"]);
	effectFXAA.uniforms['resolution'].value.set(1 / Spatial.game.viewport.width, 1 / Spatial.game.viewport.height);			      
              
	var hblur = new THREE.ShaderPass(THREE.ShaderExtras["horizontalBlur"]);
	var vblur = new THREE.ShaderPass(THREE.ShaderExtras["verticalBlur"]);
  
	var bluriness = 3;
	hblur.uniforms['h'].value = bluriness / Spatial.game.viewport.width;
	vblur.uniforms['v'].value = bluriness / Spatial.game.viewport.height;

	var renderModelGlow = new THREE.RenderPass( this.scene, this.camera );

	this.glowcomposer = new THREE.EffectComposer(this.gameView.renderer, renderTargetGlow);
	this.glowcomposer.addPass(renderModelGlow);
	this.glowcomposer.addPass(hblur);
	this.glowcomposer.addPass(vblur);
	this.glowcomposer.addPass(hblur);
	this.glowcomposer.addPass(vblur);       
								
	var finalshader = {
		uniforms: {
			tDiffuse: { type: "t", value: 0, texture: null },
			tGlow: { type: "t", value: 1, texture: null }
		},
		vertexShader: [
			"varying vec2 vUv;",
			"void main() {",
				"vUv = vec2( uv.x, 1.0 - uv.y );",
				"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),
		fragmentShader: [
			"uniform sampler2D tDiffuse;",
			"uniform sampler2D tGlow;",
			"varying vec2 vUv;",
			"void main() {",
				"vec4 texel = texture2D( tDiffuse, vUv );",
				"vec4 glow = texture2D( tGlow, vUv );",
				"gl_FragColor = texel + vec4(0.5, 0.75, 1.0, 1.0) * glow * 2.0;",
			"}"
		].join("\n")
	};

	finalshader.uniforms[ 'tGlow' ].texture = this.glowcomposer.renderTarget2;
				
	var renderModel = new THREE.RenderPass(this.gameView.scene, this.gameView.camera);
  
	var finalPass = new THREE.ShaderPass(finalshader);
	finalPass.needsSwap = true;
	finalPass.renderToScreen = true;

	var renderTarget = new THREE.WebGLRenderTarget(Spatial.game.viewport.width, Spatial.game.viewport.height, renderTargetParameters);

	this.finalcomposer = new THREE.EffectComposer(this.gameView.renderer, renderTarget);
	this.finalcomposer.addPass(renderModel);
	this.finalcomposer.addPass(effectFXAA);
	this.finalcomposer.addPass(finalPass);
              
  // events            
  Spatial.game.events.add(Spatial.Events.RESIZE, this.onWindowResized, this);
  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
};

Spatial.EffectsView.prototype.render = function(camPos) {
  this.camera.position = this.gameView.camera.position;
  this.camera.lookAt(this.scene.position);

	//this.glowcomposer.render(0.1);
	//this.finalcomposer.render(0.1);
};

/**
 * Window resize
 **/
Spatial.GameView.prototype.onWindowResized = function(data) {
	this.camera.projectionMatrix.makePerspective(60, data.aspectRatio, 1, 1100);
}