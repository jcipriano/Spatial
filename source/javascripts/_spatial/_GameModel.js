Spatial.GameModel = function(){
  this.uiMeshes = [];
};

Spatial.GameModel.prototype.updateScore = function() {
  
};

Spatial.GameModel.prototype.clearScore = function() {

};

Spatial.GameModel.prototype.incrementLevel = function() {

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