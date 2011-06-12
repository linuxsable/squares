(function() {
  var Entity;
  Entity = (function() {
    function Entity(game, coord, size, color) {
      this.game = game;
      this.coord = coord;
      this.size = size;
      this.color = color;
      this.position = this.coord;
      this.velocity = 2;
      this.destination = null;
      this.mind = new StateMachine;
      this.id = 0;
      this.keyHandler = new KeyHandler;
    }
    Entity.prototype.destroy = function() {};
    Entity.prototype.render = function() {};
    Entity.prototype.update = function() {
      return this.mind.think();
    };
    Entity.prototype.move = function(direction) {
      switch (direction) {
        case 'up':
          this.position.y -= this.velocity;
          break;
        case 'down':
          this.position.y += this.velocity;
          break;
        case 'left':
          this.position.x -= this.velocity;
          break;
        case 'right':
          this.position.x += this.velocity;
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
      sensitivity = sensitivity || 5;
      this.size.width += sensitivity;
      this.size.height += sensitivity;
      return this;
    };
    Entity.prototype.decrementSize = function(sensitivity) {
      sensitivity = sensitivity || 5;
      this.size.width -= sensitivity;
      this.size.height -= sensitivity;
      return this;
    };
    return Entity;
  })();
}).call(this);
