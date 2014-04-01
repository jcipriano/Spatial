Spatial.HudView = function(el) {
  console.log('Spatial.HudView');
  
  this.domEl = $(el);
  
  this.$clock = this.domEl.find('#clock');
  this.$min =  this.domEl.find('#clock-min');
  this.$sec =  this.domEl.find('#clock-sec');
  this.$mil =  this.domEl.find('#clock-mil');
  this.$level = this.domEl.find('#level-num');

  this.start();
};

/**
 * Initialize hud view
 **/
Spatial.HudView.prototype.start = function() {

  Spatial.game.events.add(Spatial.Events.TIMER_TICK, this.timerTick, this);
  Spatial.game.events.add(Spatial.Events.TIMER_STOP, this.timerStop, this);
  Spatial.game.events.add(Spatial.Events.TIMER_START, this.timerStart, this);

  Spatial.game.events.add(Spatial.Events.LEVEL_START, this.levelStart, this);
  Spatial.game.events.add(Spatial.Events.LEVEL_END, this.levelEnd, this);
};

/**
 * Timer Tick
 **/
Spatial.HudView.prototype.timerTick = function(data) {

  var min, sec, mil;

  sec = Math.floor(data.time / 1000);
  min = Math.floor(sec / 60);
  sec = sec % 60;
  mil = (data.time % 1000) / 10;

  this.$min.html( min < 10 ? 0 + '' + min : min );
  this.$sec.html( sec < 10 ? 0 + '' + sec : sec );
  this.$mil.html( mil < 10 ? 0 + '' + mil : mil );

  if(sec > 9 && !this.$clock.hasClass('warning1')) {
    this.$clock.addClass('warning1');
  }

  else if(sec > 19 && !this.$clock.hasClass('warning2')) {
    this.$clock.addClass('warning2');
  }

  else if(sec > 29 && !this.$clock.hasClass('warning3')) {
    this.$clock.addClass('warning3');
  }
};

/**
 * Timer Stop
 **/
Spatial.HudView.prototype.timerStop = function() {
  this.reset();
};

/**
 * Timer Start
 **/
Spatial.HudView.prototype.timerStart = function() {

};

/**
 * Hud Reset
 **/
Spatial.HudView.prototype.reset = function() {
  this.$min.html( '00' );
  this.$sec.html( '00' );
  this.$mil.html( '00' );
  this.$clock.removeAttr('class');
};

/**
 * Level Start
 **/
Spatial.HudView.prototype.levelStart = function(data) {
  console.log('Spatial.HudView.prototype.levelStart');
  this.$level.html( data.level + 1 ); 
};

/**
 * Level End
 **/
Spatial.HudView.prototype.levelEnd = function() {

};