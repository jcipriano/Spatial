Spatial.AudioManager = function(){
  
  this.events = new Spatial.EventPublisher();
  this.tracksLoaded = 0;
  
  this.audioTracks = [];
  this.audioTracksById = [];
  this.length = Spatial.Config.audio.length;
  
  var audioTrack;
  var i = this.length;
  while(i--) {
    audioTrack = new Spatial.AudioTrack(Spatial.Config.audio[i]);
    this.audioTracks[i] = this.audioTracksById[audioTrack.data.id] = audioTrack;
  }
};

Spatial.AudioManager.prototype.load = function() {
  
  var audioTrack;
  var i = this.length;
  while(i--) {
    audioTrack = this.audioTracks[i];
    audioTrack.events.add(Spatial.Events.LOADED, this.audioTrackLoaded, this);
    audioTrack.load();
  }
};

Spatial.AudioManager.prototype.audioTrackLoaded = function(audioTrack) {
  
  this.tracksLoaded = this.tracksLoaded + 1;
  audioTrack.events.remove(Spatial.Events.LOADED, this.audioTrackLoaded, this);
  
  if(this.tracksLoaded === this.length){
    this.events.publish(Spatial.Events.LOADED, this);
  }
};

Spatial.AudioManager.prototype.play = function (id) {
  this.getTrack(id).play();
}; 

Spatial.AudioManager.prototype.stop = function (id) {
  this.getTrack(id).stop();
};

Spatial.AudioManager.prototype.getTrack = function (id) {
  return this.audioTracksById[id];
};