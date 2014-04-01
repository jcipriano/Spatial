Spatial.Events = {
  CLICK: 'click',
  LOADED: 'loaded',
  PLAY: 'play',
  STOP: 'stop',
  ERROR: 'error',
  MOVE: 'move',
  RESIZE: 'resize',
  SELECTED: 'selected',
  DESELECTED: 'deselected',
  SUCCESS: 'success',
  FAILURE: 'failure',
  ENTERFRAME: 'enterframe',

  TIMER_TICK: 'timer_tick',
  TIMER_STOP: 'timer_stop',
  TIMER_START: 'timer_start',

  LEVEL_START: 'level_start',
  LEVEL_END: 'level_end'
};

Spatial.EventPublisher = function() {
  this.events = { };
};

Spatial.EventPublisher.prototype.publish = function(event, data) {
  var i, scope, callback, callbacks, _results;
    
  if (this.events && this.events[event]) {
    callbacks = this.events[event];
      
    i = 0;
    _results = [];
    while (i < callbacks.length) {
      scope = callbacks[i].obj;
      callback = callbacks[i].func;
      callback.apply(scope ? scope : this, [data]);
      _results.push(i++);
    }
      
    return _results;
  }
};

Spatial.EventPublisher.prototype.add = function(event, callback, scope) {
  if (!this.events[event]){
    this.events[event] = [];
  }
  var obj = { func: callback, obj: scope };
  return this.events[event].push(obj);
};
  
Spatial.EventPublisher.prototype.remove = function(event, callback, scope) {
  var index, callbacks;
    
  if (this.events && this.events[event]) {
    callbacks = this.events[event];
    index = -1;
    
    for(var i = 0, len = callbacks.length; i < len; i++) {
      var obj = callbacks[i];
      if(obj.func === callback && obj.obj === scope){
        index = i;
        break;
      }
    }
    
    if(index === -1){
      return false;
    }
    return callbacks.splice(index, 1);
  }
};