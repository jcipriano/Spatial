Spatial.StructureGroup = function() {
  
  THREE.Object3D.call(this);
  
  this.length;
  this.group;
  this.spatialObjs = [];
  this.selections = [];
  this.activePlatforms;
};

Spatial.StructureGroup.prototype = new THREE.Object3D();
Spatial.StructureGroup.prototype.constructor = Spatial.StructureGroup;
Spatial.StructureGroup.prototype.supr = THREE.Object3D.prototype;

Spatial.StructureGroup.prototype.generate = function(activePlatforms) {
  
  if(this.spatialObjs.length){
    this.degenerate();
  }
  
  this.activePlatforms = activePlatforms;
  this.length = activePlatforms.length;
  
  this.group = new THREE.Object3D();
  this.add(this.group);
  
  this.spatialObjs = [];
  
  var strLength = 20;
  var strSize = 5;
  
  var str, lastStr;
  var i = 0, len = this.length;
  for(i; i<len; i++) {
    // generate if first one or last one
    if(!lastStr || i === len-1) {
      str = new Spatial.Structure(strLength, strSize);
    }
    // clone
    else {
      str = lastStr.clone(true);
    }
    
    this.group.add(str);
    this.spatialObjs.push(str);
    
    lastStr = str;
  }
  
  // shuffle them
  this.spatialObjs = Spatial.Util.shuffle(this.spatialObjs);
  
  // lay them out
  i = 0, len = this.spatialObjs.length;
  for(i; i<len; i++) {
    str = this.spatialObjs[i];
    pfm = this.activePlatforms[i];

    str.showWireframe();
    str.positionId = i;
    str.position = new THREE.Vector3(pfm.position.x, 0, pfm.position.z);
    
    str.events.add(Spatial.Events.SELECTED, this.structureSelected, this);
    str.events.add(Spatial.Events.DESELECTED, this.structureDeselected, this);
  }

  Spatial.game.events.add(Spatial.Events.ENTERFRAME, this.render, this);
};

Spatial.StructureGroup.prototype.degenerate = function() {
  
  this.selections = [];
  
  var i = this.spatialObjs.length;
  var str;
  while(i--) {
    str = this.spatialObjs[i];
    str.events.remove(Spatial.Events.SELECTED, this.structureSelected, this);
    str.events.remove(Spatial.Events.DESELECTED, this.structureDeselected, this);
    str.degenerate();
    
    this.group.remove(str);
  }
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
    console.log('Spatial.StructureGroup.prototype.verify: true');
    Spatial.game.events.publish(Spatial.Events.SUCCESS);
    return true;
  }else{
    console.log('Spatial.StructureGroup.prototype.verify: false');
    Spatial.game.events.publish(Spatial.Events.FAILURE);
    return true;
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