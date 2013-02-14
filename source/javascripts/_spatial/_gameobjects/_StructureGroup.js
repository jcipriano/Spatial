Spatial.StructureGroup = function() {
  
  THREE.Object3D.call(this);
  
  this.length;
  this.group;
  this.spatialObjs;
  this.selections = [];
};

Spatial.StructureGroup.prototype = new THREE.Object3D();
Spatial.StructureGroup.prototype.constructor = Spatial.StructureGroup;
Spatial.StructureGroup.prototype.supr = THREE.Object3D.prototype;

Spatial.StructureGroup.prototype.generate = function(activePlatforms) {
  
  this.activePlatforms = activePlatforms;
  this.length = activePlatforms.length;
  
  this.group = new THREE.Object3D();
  this.add(this.group);
  
  this.spatialObjs = [];
  
  var strLength = 20;
  var strSize = 5;
  
  var str, lastStr;
  var i = 0, len = this.length-1;
  for(i; i<len; i++) {
    // generate
    if(!lastStr){
      str = new Spatial.Structure(strLength, strSize);
    }
    // clone
    else{
      str = lastStr.clone(true);
    }
    this.group.add(str);
    this.spatialObjs.push(str);
    
    lastStr = str;
  }
  
  // generate last one
  var str =  new Spatial.Structure(strLength, strSize);
  this.group.add(str);
  this.spatialObjs.push(str);
  
  // shuffle them
  this.spatialObjs = Spatial.Util.shuffle(this.spatialObjs);
  
  // lay them out
  var width = 250;
  var spacing = width / (this.spatialObjs.length - 1);
  var startX = 0 - width / 2;
  i = 0, len = this.spatialObjs.length;
  for(i; i<len; i++) {
    str = this.spatialObjs[i];
    pfm = activePlatforms[i];

    str.positionId = i;
    str.position = new THREE.Vector3(pfm.position.x, 0, pfm.position.z);
    str.showWireframe();
    str.events.add(Spatial.Events.SELECTED, this.structureSelected, this);
    str.events.add(Spatial.Events.DESELECTED, this.structureDeselected, this);
  }

  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
};

Spatial.StructureGroup.prototype.structureSelected = function(data) {
  Spatial.Util.addTo(this.selections, data.target);
  this.verify();
  
  this.activePlatforms[data.target.positionId].particleOn(); 
  
  Spatial.game.events.publish(Spatial.Events.SELECTED, data);
};

Spatial.StructureGroup.prototype.structureDeselected = function(data) {
  Spatial.Util.removeFrom(this.selections, data.target);
  this.verify();
  
  this.activePlatforms[data.target.positionId].particleOff(); 
  
  Spatial.game.events.publish(Spatial.Events.DESELECTED, data);
};

Spatial.StructureGroup.prototype.verify = function() {
  if(this.allFound()){
    Spatial.game.events.publish(Spatial.Events.SUCCESS);
  }
};

Spatial.StructureGroup.prototype.allFound = function() {
  
  if(this.selections.length !== this.length -1){
    return false;
  }
  
  var i = this.spatialObjs.length;
  var str, lastStr;
  while(i--) {
    str = this.selections[i];
    if(lastStr && !str.equals(lastStr)){
      return false;
    }
    lastStr = str;

  }
  return true;
};

Spatial.StructureGroup.prototype.render = function() {
  
};