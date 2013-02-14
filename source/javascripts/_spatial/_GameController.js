Spatial.GameController = function(){
  this.start();
};

/**
 * Start
 **/
Spatial.GameController.prototype.start = function() {
  
  var that = this;
  Spatial.game.view.start(function(){
    that.activePlatforms = Spatial.game.view.room.activate(3);
    Spatial.game.view.structureGroup.generate(that.activePlatforms);
  });
  
  Spatial.game.events.add(Spatial.Events.SUCCESS, this.levelSuccess, this);
  Spatial.game.events.add(Spatial.Events.FAILURE, this.levelFail, this);
};

Spatial.GameController.prototype.levelSuccess = function() {
  
  var that = this;
  setTimeout(function(){
    that.activePlatforms = Spatial.game.view.room.activate(5);
    Spatial.game.view.structureGroup.generate(that.activePlatforms);
  }, 1000);
};

Spatial.GameController.prototype.levelFail = function() {
  
};
