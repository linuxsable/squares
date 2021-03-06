var Entity;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Entity = (function() {
  function Entity(game, coord, size, color, id) {
    this.game = game;
    this.size = size;
    this.color = color;
    this.id = id != null ? id : 0;
    this.position = coord;
    this.velocity = 2;
    this.destination = null;
    this.mind = new StateMachine;
    this.keyHandler = new KeyHandler;
  }
  Entity.prototype.destroy = function() {};
  Entity.prototype.render = function() {};
  Entity.prototype.isViewable = function() {};
  Entity.prototype.initControlEvents = function() {
    $(document).bind('keydown', __bind(function(e) {
      return this.keyHandler.onKeydown(e);
    }, this));
    return $(document).bind('keyup', __bind(function(e) {
      return this.keyHandler.onKeyup(e);
    }, this));
  };
  Entity.prototype.update = function() {
    return this.mind.think();
  };
  Entity.prototype.move = function(direction, velocity) {
    if (velocity == null) {
      velocity = this.velocity;
    }
    switch (direction) {
      case 'up':
        this.position.y -= velocity;
        break;
      case 'down':
        this.position.y += velocity;
        break;
      case 'left':
        this.position.x -= velocity;
        break;
      case 'right':
        this.position.x += velocity;
    }
    return this;
  };
  Entity.prototype.teleport = function() {
    this.position = Coord.getRandomInsideCanvas(this.game);
    return this;
  };
  Entity.prototype.randomDestination = function() {
    this.destination = Coord.getRandomInsideCanvas(this.game);
    return this;
  };
  Entity.prototype.incrementSize = function(sensitivity) {
    if (sensitivity == null) {
      sensitivity = 5;
    }
    this.size.width += sensitivity;
    this.size.height += sensitivity;
    return this;
  };
  Entity.prototype.decrementSize = function(sensitivity) {
    if (sensitivity == null) {
      sensitivity = 5;
    }
    this.size.width -= sensitivity;
    this.size.height -= sensitivity;
    return this;
  };
  return Entity;
})();