Spatial.GameModel = function(){
  this.uiMeshes = [];
  this.level = 0;
};

Spatial.GameModel.prototype.updateScore = function() {
  
};

Spatial.GameModel.prototype.clearScore = function() {
  
};

Spatial.GameModel.prototype.getLevelData = function(level) {
  return Spatial.Config.levels[level ? level : this.level];
};

Spatial.GameModel.prototype.getLevel = function() {
  return this.level;
};

Spatial.GameModel.prototype.incrementLevel = function() {
  this.level = this.level + 1
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