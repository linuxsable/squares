var Viewport;
Viewport = (function() {
  function Viewport(game, position) {
    this.game = game;
    if (!(position != null)) {
      this.position = new Coord(0, 0);
    } else {
      this.position = position;
    }
    this.size = new Size(this.game.canvasWidth, this.game.canvasHeight);
  }
  Viewport.prototype.move = function(direction, velocity) {
    if (velocity == null) {
      velocity = 1;
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
    console.log('X: ' + this.position.x + ' Y: ' + this.position.y);
    return this;
  };
  return Viewport;
})();