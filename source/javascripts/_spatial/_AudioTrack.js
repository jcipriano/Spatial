Spatial.AudioTrack = function(data) {
  this.data = data;
  this.audioContext;
  this.source;
  this.gainNode;
  this.autoPlay;
  this.loop;
  this.channelData = [];
  this.events = new Spatial.EventPublisher();
};

Spatial.AudioTrack.prototype.load = function() {
  //console.log('Spatial.AudioTrack.prototype.load');
  this.audioContext = new window.webkitAudioContext();
  
  var that = this;
  var request = new XMLHttpRequest();
  request.open("GET", this.data.source, true);
  request.responseType = "arraybuffer";
  request.onload = function() { 
    that.onload(request.response);
  }
  request.send();
};

Spatial.AudioTrack.prototype.onload = function(response) {
  //console.log('Spatial.AudioTrack.prototype.onload: ', response);
  
  var that = this;
  this.audioContext.decodeAudioData(response, function(buffer) {
    that.ondecode(buffer);
  }, function(){ });
};

Spatial.AudioTrack.prototype.ondecode = function(buffer) {
  //console.log('Spatial.AudioTrack.prototype.ondecode: ', buffer);

  this.source = this.audioContext.createBufferSource();
  this.source.buffer = buffer;

  this.gainNode = this.audioContext.createGainNode();
  this.source.connect(this.gainNode);
  this.gainNode.connect(this.audioContext.destination)
  
  if(this.autoPlay){
    this.play();
  }
  
  this.events.publish(Spatial.Events.LOADED, this);
};

Spatial.AudioTrack.prototype.play = function(callback) {
  //console.log('Spatial.AudioTrack.prototype.play');
  this.source.loop = this.loop;
  this.source.noteOn(0);
  
  this.events.publish(Spatial.Events.PLAY, this);
};

Spatial.AudioTrack.prototype.stop = function(callback) {
  //console.log('Spatial.AudioTrack.prototype.stop');
  this.source.noteOff(0);
  
  this.events.publish(Spatial.Events.STOP, this);
};

