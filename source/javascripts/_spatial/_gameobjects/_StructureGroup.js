Spatial.StructureGroup = function(length) {
  //console.log('Spatial.Structure');
  
  THREE.Object3D.call(this);
  
  this.length = length;
  this.group;
  this.spatialObjs;
  
  this.build();
};

Spatial.StructureGroup.prototype = new THREE.Object3D();
Spatial.StructureGroup.prototype.constructor = Spatial.StructureGroup;
Spatial.StructureGroup.prototype.supr = THREE.Object3D.prototype;

Spatial.StructureGroup.prototype.build = function() {
  this.group = new THREE.Object3D();
  this.add(this.group);
  
  this.spatialObjs = [];
  
  var str, lastStr;
  var i = 0, len = this.length-1;
  for(i; i<len; i++) {
    // clone
    if(lastStr){
      str = lastStr.clone(true);
    }
    // generate
    else{
      str = new Spatial.Structure(10, 10);
    }
    this.group.add(str);
    this.spatialObjs.push(str);
    
    lastStr = str;
  }
  
  // generate last one
  var str =  new Spatial.Structure(10, 10);
  this.group.add(str);
  this.spatialObjs.push(str);
  
  // shuffle them
  this.spatialObjs = Spatial.Util.shuffle(this.spatialObjs);
  
  // lay them out
  var width = 225;
  var spacing = width / (this.spatialObjs.length - 1);
  var startX = 0 - width / 2;
  i = 0, len = this.spatialObjs.length;
  for(i; i<len; i++) {
    str = this.spatialObjs[i];
    str.showWireframe();
    str.position.x = startX + spacing * i;
  }
};

Spatial.StructureGroup.prototype.rotate = function() {
  var i = this.spatialObjs.length;
  var spatialObj;
  while(i--) {
    spatialObj = this.spatialObjs[i];
    spatialObj.rotation.x = spatialObj.rotation.x + 0.01;
    spatialObj.rotation.y = spatialObj.rotation.y + 0.01;
  }
};