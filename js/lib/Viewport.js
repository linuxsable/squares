var Viewport;
Viewport = (function() {
  function Viewport(game, coord) {
    this.game = game;
    if (!(coord != null)) {
      this.coord = new Coord(0, 0);
    } else {
      this.coord = coord;
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
    return this;
  };
  return Viewport;
})();