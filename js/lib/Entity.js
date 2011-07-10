var Entity;
Entity = (function() {
  function Entity(game, coord, size, color) {
    this.game = game;
    this.size = size;
    this.color = color;
    this.position = coord;
    this.velocity = 2;
    this.destination = null;
    this.id = 0;
    this.mind = new StateMachine;
    this.keyHandler = new KeyHandler;
  }
  Entity.prototype.destroy = function() {};
  Entity.prototype.render = function() {};
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