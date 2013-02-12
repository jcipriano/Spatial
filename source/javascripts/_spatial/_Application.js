var Spatial = {};

Spatial.Game = function() {
  
  this.gameView;
  this.effectsView
  this.model;
  this.events;
  
  this.viewport = {
    width: $(window).width(),
    height: $(window).height(),
    aspectRatio: $(window).width() / $(window).height()
  };
  
  this.mouse = { x: 0, y: 0, xP: 0, yP: 0 }
};

/**
 * Game init
 **/
Spatial.Game.prototype.init = function() {
  
  // events
  this.events = new Spatial.EventPublisher();
  var that = this;
  $(window).resize(function(event){ that.onWindowResized(event); });
	this.onWindowResized(null);
  $(window).mousemove(function(event){ that.onMouseMove(event); });
  $(window).click(function(event){ that.onMouseClick(event); });

  // model
  this.model = new Spatial.GameModel();
  
  // game view
  this.gameView = new Spatial.GameView('#canvas-holder');
  this.gameView.start();
  
  // effects view
  this.effectsView = new Spatial.EffectsView();
  
  this.enterframe();
};

/**
 * Rendering loop
 **/
Spatial.Game.prototype.enterframe = function() {
  
  this.events.publish(Spatial.Events.ENTERFRAME);
  
  var that = this;
  window.requestAnimationFrame(function(){
    that.enterframe();
  });
};

/**
 * Window resize
 **/
Spatial.Game.prototype.onWindowResized = function(event) {
  this.viewport = {
    width: $(window).width(),
    height: $(window).height(),
    aspectRatio: $(window).width() / $(window).height(),
    event: event
  };
  
  this.events.publish(Spatial.Events.RESIZE, this.viewport);
}

/**
 * Mouse move
 **/
Spatial.Game.prototype.onMouseMove = function(event) {
  this.mouse = {
    x: event.x,
    y: event.y,
    xP: (event.x - this.viewport.width / 2) / (this.viewport.width / 2),
    yP: (event.y - this.viewport.height / 2) / (this.viewport.height / 2),
    event: event
  };
  
  this.events.publish(Spatial.Events.MOVE, this.mouse);
}

/**
 * Mouse click
 **/
Spatial.Game.prototype.onMouseClick = function(event) {
  event.preventDefault();

  this.events.publish(Spatial.Events.CLICK, {
    x: event.clientX,
    y: event.clientY,
    event: event
  });
};

$(function(){
  Spatial.game = new Spatial.Game();
  Spatial.game.init();
});
