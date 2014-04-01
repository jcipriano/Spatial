Spatial.GameTimer = function(){
	this.interval = undefined;
	this.gameTime = 0;
	this.timeInterval = 10;
};

/**
 * Start
 **/
Spatial.GameTimer.prototype.start = function() {

	this.gameTime = 0;
	Spatial.game.events.publish(Spatial.Events.TIMER_START, { time: this.gameTime });

  var that = this;
  this.interval = window.setInterval(function(e) {
  	that.onInterval(e);
  }, this.timeInterval);
  
};

/**
 * On Interval
 **/
Spatial.GameTimer.prototype.onInterval = function(e) {
  
	this.gameTime = this.gameTime + this.timeInterval;
	Spatial.game.events.publish(Spatial.Events.TIMER_TICK, { time: this.gameTime });

};

/**
 * Get Time
 **/
Spatial.GameTimer.prototype.getTime = function() {

	return this.gameTime;

};

/**
 * Stop
 **/
Spatial.GameTimer.prototype.stop = function() {
  
	window.clearInterval(this.interval);
	Spatial.game.events.publish(Spatial.Events.TIMER_STOP, { time: this.gameTime });

};

