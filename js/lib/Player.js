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