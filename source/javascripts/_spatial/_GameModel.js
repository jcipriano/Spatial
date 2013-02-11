Spatial.GameModel = function(){
  this.structureMeshes = [];
};

Spatial.GameModel.prototype.updateScore = function() {
  
};

Spatial.GameModel.prototype.clearScore = function() {

};

Spatial.GameModel.prototype.incrementLevel = function() {

};

Spatial.GameModel.prototype.resetLevel = function() {

};

Spatial.GameModel.prototype.addStructureMesh = function(obj) {
  
  if(this.structureMeshes.indexOf(obj) !== -1){
    throw new Error("Object already in uiObjects.");
    return;
  }
  
  this.structureMeshes.push(obj);
};

Spatial.GameModel.prototype.removeStructureMesh = function(obj) {
  
  if(this.structureMeshes.indexOf(obj) === -1){
    throw new Error("Object does not exist in uiObjects.");
    return;
  }
   
  this.uiObjects.splice(this.structureMeshes.indexOf(obj), 1);
};