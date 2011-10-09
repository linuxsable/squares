var Player;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Player = (function() {
  __extends(Player, Entity);
  function Player() {
    Player.__super__.constructor.apply(this, arguments);
  }
  Player.prototype.render = function() {
    var context;
    Player.__super__.render.call(this);
    if (!this.isViewable()) {
      return;
    }
    context = this.game.canvasBufferContext;
    context.fillStyle = this.color;
    context.shadowColor = '#333';
    context.shadowBlur = 2;
    context.shadowOffsetY = 2;
    context.shadowOffsetX = 2;
    return context.fillRect(this.position.x - this.game.viewport.position.x, this.position.y - this.game.viewport.position.y, this.size.width, this.size.height);
  };
  Player.prototype.move = function(direction, velocity) {
    var oldPosition, padding;
    if (velocity == null) {
      velocity = this.velocity;
    }
    oldPosition = $.extend(true, {}, this.position);
    padding = this.game.viewport.padding;
    switch (direction) {
      case 'up':
        this.position.y -= velocity;
        if ((this.game.viewport.position.y + padding / 2) >= this.position.y) {
          this.game.viewport.move('up', velocity);
        }
        break;
      case 'down':
        this.position.y += velocity;
        if ((this.game.viewport.position.y + this.game.viewport.size.height - padding) <= this.position.y) {
          this.game.viewport.move('down', velocity);
        }
        break;
      case 'left':
        this.position.x -= velocity;
        if ((this.game.viewport.position.x + padding) >= this.position.x) {
          this.game.viewport.move('left', velocity);
        }
        break;
      case 'right':
        this.position.x += velocity;
        if ((this.game.viewport.position.x + this.game.viewport.size.width - padding) <= this.position.x) {
          this.game.viewport.move('right', velocity);
        }
    }
    if (this.position.x > (this.game.world.size.width - this.size.width) || this.position.x <= 0 || this.position.y > (this.game.world.size.height - this.size.height) || this.position.y <= 0) {
      this.position = oldPosition;
    }
    return this;
  };
  Player.prototype.update = function() {
    var k;
    k = this.keyHandler;
    if (k.isDown(k.KEYS.W)) {
      this.move('up');
    }
    if (k.isDown(k.KEYS.S)) {
      this.move('down');
    }
    if (k.isDown(k.KEYS.A)) {
      this.move('left');
    }
    if (k.isDown(k.KEYS.D)) {
      return this.move('right');
    }
  };
  Player.prototype.isViewable = function() {
    if (this.position.x > this.game.viewport.position.x && this.position.y > this.game.viewport.position.y && this.position.x < this.game.viewport.position.x + this.game.viewport.size.width && this.position.y < this.game.viewport.position.y + this.game.viewport.size.height) {
      return true;
    }
    return false;
  };
  return Player;
})();