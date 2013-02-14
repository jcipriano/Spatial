Spatial.GameController = function(){
  this.start();
};

Spatial.GameController.prototype.start = function() {
  
  Spatial.game.view.start(function(){
    
    this.activePlatforms = Spatial.game.view.room.activate(5);
    
    Spatial.game.view.structureGroup.generate(this.activePlatforms);
    
  });
  
};
