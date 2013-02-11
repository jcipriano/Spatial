var Spatial = {};

Spatial.Game = function() {
  this.view;
  this.model;
};

Spatial.Game.prototype.init = function() {
  this.view = new Spatial.GameView('#canvas-holder');
  
  this.model = new Spatial.GameModel();
  
  this.view.start();
};

$(function(){
  Spatial.game = new Spatial.Game();
  Spatial.game.init();
});
