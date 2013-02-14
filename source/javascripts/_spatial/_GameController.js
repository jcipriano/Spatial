Spatial.GameController = function(){
  this.start();
};

/**
 * Start
 **/
Spatial.GameController.prototype.start = function() {

  Spatial.game.events.add(Spatial.Events.SUCCESS, this.levelSuccess, this);
  Spatial.game.events.add(Spatial.Events.FAILURE, this.levelFail, this);
  
  var that = this;
  Spatial.game.view.start(function(){
    that.startNextLevel();
  });
};

Spatial.GameController.prototype.levelSuccess = function() {
  Spatial.game.model.incrementLevel();
  this.startNextLevel();
};

Spatial.GameController.prototype.startNextLevel = function() {
  
  console.log(Spatial.game.model.getLevelData().name);
  
  var that = this;
  setTimeout(function(){
    that.activePlatforms = Spatial.game.view.room.activate();
    Spatial.game.view.structureGroup.generate(that.activePlatforms);
  }, 1000);
};

Spatial.GameController.prototype.levelFail = function() {
  
};
