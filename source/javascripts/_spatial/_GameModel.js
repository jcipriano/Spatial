Spatial.GameModel = function(){
  this.uiMeshes = [];
  this.level = 0;
  this.levelData = Spatial.Config.levels[this.level];
};

Spatial.GameModel.prototype.updateScore = function() {
  
};

Spatial.GameModel.prototype.clearScore = function() {
  
};

Spatial.GameModel.prototype.getLevelData = function(level) {
  return level ? Spatial.Config.levels[level] : this.levelData;
};

Spatial.GameModel.prototype.getLevel = function() {
  return this.level;
};

Spatial.GameModel.prototype.incrementLevel = function() {
  this.level = this.level + 1
  this.levelData = Spatial.Config.levels[this.level];
};

Spatial.GameModel.prototype.resetLevel = function() {

};

Spatial.GameModel.prototype.addUiMesh = function(obj) {
  
  if(this.uiMeshes.indexOf(obj) !== -1){
    throw new Error("Object already in uiObjects.");
    return;
  }
  
  this.uiMeshes.push(obj);
};

Spatial.GameModel.prototype.removeUiMesh = function(obj) {
  
  if(this.uiMeshes.indexOf(obj) === -1){
    throw new Error("Object does not exist in uiObjects.");
    return;
  }
   
  this.uiMeshes.splice(this.uiMeshes.indexOf(obj), 1);
};