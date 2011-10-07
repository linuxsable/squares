var Viewport;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Viewport = (function() {
  function Viewport(game, position) {
    this.game = game;
    this.size = new Size(this.game.canvasWidth, this.game.canvasHeight);
    this.keyHandler = new KeyHandler;
    if (!(position != null)) {
      this.position = new Coord(0, 0);
    } else {
      this.position = position;
    }
  }
  Viewport.prototype.move = function(direction, velocity) {
    var oldPosition;
    if (velocity == null) {
      velocity = 3;
    }
    oldPosition = $.extend(true, {}, this.position);
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
    if (this.position.x > this.game.world.size.width || this.position.x < 0 || this.position.y > this.game.world.size.height || this.position.y < 0) {
      this.position = oldPosition;
    }
    console.log('X: ' + this.position.x + ' Y: ' + this.position.y);
    return this;
  };
  Viewport.prototype.update = function() {
    var k;
    k = this.keyHandler;
    if (k.isDown(k.KEYS.UP)) {
      this.move('up');
    }
    if (k.isDown(k.KEYS.DOWN)) {
      this.move('down');
    }
    if (k.isDown(k.KEYS.LEFT)) {
      this.move('left');
    }
    if (k.isDown(k.KEYS.RIGHT)) {
      return this.move('right');
    }
  };
  Viewport.prototype.initControlEvents = function() {
    $(document).bind('keydown', __bind(function(e) {
      return this.keyHandler.onKeydown(e);
    }, this));
    return $(document).bind('keyup', __bind(function(e) {
      return this.keyHandler.onKeyup(e);
    }, this));
  };
  return Viewport;
})();