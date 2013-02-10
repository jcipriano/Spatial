var Spatial = {};

Spatial.Game = function() {
  this.gameView;
};

Spatial.Game.prototype.init = function() {
  this.gameView = new Spatial.GameView('#canvas-holder');
  this.gameView.start();
};

$(function(){
  var game = new Spatial.Game();
  game.init();
});
