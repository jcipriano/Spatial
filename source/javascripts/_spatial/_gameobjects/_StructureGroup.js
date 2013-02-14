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
  
  this.lvlData = Spatial.game.model.getLevelData();
  
  if(this.spatialObjs.length){
    this.degenerate();
  }
  
  this.activePlatforms = activePlatforms;
  this.length = activePlatforms.length;
  
  this.group = new THREE.Object3D();
  this.add(this.group);
  
  this.spatialObjs = [];
  
  this.numOfUniques = this.length - Spatial.Util.randInt(2, this.length);
  this.clones = [];
  
  var strLength = this.lvlData.cubeLength;
  var strSize = this.lvlData.cubeSize;
  
  var str, lastStr;
  var i = 0, len = this.length;
  var lengthPad = strLength > 3 ? -2 : 1; // padding will ensure that the structure is unique
  for(i; i<len; i++) {
    
    if(i < this.numOfUniques) {
      str = new Spatial.Structure(strLength + lengthPad, strSize);
      lengthPad = lengthPad == -1 ? 1 :  lengthPad + 1;
    }else{
      str = lastStr ? lastStr.clone(true) :new Spatial.Structure(strLength, strSize);
      lastStr = str;
      this.clones.push(str);
    }
    
    this.group.add(str);
    this.spatialObjs.push(str);
  }
  
  console.log('number of clones generated: ', this.clones.length);
  
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
  this.activePlatforms[data.target.positionId].particleOn(); 
  
  Spatial.game.events.publish(Spatial.Events.SELECTED, data);
  
  if(this.clones.indexOf(data.target) === -1){
    console.log('you picked a unique');
  }else{
    console.log('you picked a clone');
  }
  
  this.verify(data.target);
};

Spatial.StructureGroup.prototype.structureDeselected = function(data) {
  
  Spatial.Util.removeFrom(this.selections, data.target);
  this.activePlatforms[data.target.positionId].particleOff(); 
  
  Spatial.game.events.publish(Spatial.Events.DESELECTED, data);
  
  this.verify(data.target);
};

Spatial.StructureGroup.prototype.verify = function(data) {
  if(this.allFound(data.target)){
    console.log('Spatial.StructureGroup.prototype.verify: true');
    Spatial.game.events.publish(Spatial.Events.SUCCESS);
    return true;
  }else{
    //console.log('Spatial.StructureGroup.prototype.verify: false');
    Spatial.game.events.publish(Spatial.Events.FAILURE);
    return true;
  }
};

Spatial.StructureGroup.prototype.allFound = function() {
  
  if(this.selections.length !== this.clones.length){
    return false;
  }
  
  var i = this.selections.length;
  var str;
  while(i--) {
    str = this.selections[i];
    if(this.clones.indexOf(str) === -1){
      return false;
    }
  }
  return true;
};

Spatial.StructureGroup.prototype.render = function() {
  
};