var Viewport;
Viewport = (function() {
  function Viewport(position) {
    this.position = position;
  }
  Viewport.prototype.move = function(direction, velocity) {
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
  return Viewport;
})();