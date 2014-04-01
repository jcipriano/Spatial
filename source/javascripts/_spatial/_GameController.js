Spatial.GameController = function(){
  this.start();
};

/**
 * Start
 **/
Spatial.GameController.prototype.start = function() {
  
  Spatial.game.audio.events.add(Spatial.Events.LOADED, this.audioLoaded, this);
  Spatial.game.audio.load();
};

Spatial.GameController.prototype.audioLoaded = function() {
  
  Spatial.game.events.add(Spatial.Events.SUCCESS, this.levelSuccess, this);
  Spatial.game.events.add(Spatial.Events.FAILURE, this.levelFail, this);

  var that = this;
  Spatial.game.view.start(function(){
    that.startNextLevel();
  });
};

Spatial.GameController.prototype.levelSuccess = function() {
  Spatial.game.timer.stop();

  console.log("GET TIME: ", Spatial.game.timer.getTime());

  Spatial.game.events.publish(Spatial.Events.LEVEL_START, { level: Spatial.game.model.getLevel() } );

  Spatial.game.model.incrementLevel();

  this.startNextLevel();
};

Spatial.GameController.prototype.startNextLevel = function() {
  
  console.log(Spatial.game.model.levelData.name);

  var that = this;
  setTimeout(function(){
    that.activePlatforms = Spatial.game.view.room.activate();
    Spatial.game.view.structureGroup.generate(that.activePlatforms);
    Spatial.game.audio.play(Spatial.game.model.levelData.audio.intro);
    
    setTimeout(function() {
      Spatial.game.timer.start();
    }, 2000);

    Spatial.game.events.publish(Spatial.Events.LEVEL_START, { level: Spatial.game.model.getLevel() } );

  }, 1000);
};

Spatial.GameController.prototype.levelFail = function() {
  
};
