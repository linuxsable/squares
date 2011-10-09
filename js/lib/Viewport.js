var Viewport;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Viewport = (function() {
  function Viewport(game, position) {
    this.game = game;
    this.size = new Size(this.game.canvasWidth, this.game.canvasHeight);
    this.keyHandler = new KeyHandler;
    this.padding = 100;
    if (!(position != null)) {
      this.position = new Coord(0, 0);
    } else {
      this.position = position;
    }
  }
  Viewport.prototype.move = function(direction, velocity) {
    var oldPosition;
    if (velocity == null) {
      velocity = 4;
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
    if (this.position.x > (this.game.world.size.width - this.size.width) || this.position.x < 0 || this.position.y > (this.game.world.size.height - this.size.height) || this.position.y < 0) {
      this.position = oldPosition;
    }
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
      this.move('right');
    }
    if (k.isDown(k.KEYS.SPACE)) {
      return this.centerOverPlayer();
    }
  };
  Viewport.prototype.centerOverPlayer = function() {
    var temp;
    temp = $.extend(true, {}, this.game.getPlayer().position);
    temp.x -= this.size.width / 2;
    temp.y -= this.size.height / 2;
    if (temp.x > (this.game.world.size.width - this.size.width) || temp.x < 0 || temp.y > (this.game.world.size.height - this.size.height) || temp.y < 0) {} else {
      return this.position = temp;
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