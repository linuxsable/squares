var Monster;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Monster = (function() {
  __extends(Monster, Entity);
  function Monster(game, coord, size, color) {
    Monster.__super__.constructor.call(this, game, coord, size, color);
    this.mind.addState(new StateMonsterExploring(this));
    this.mind.addState(new StateMonsterFleeing(this));
    this.mind.setState('exploring');
  }
  Monster.prototype.render = function() {
    var context;
    Monster.__super__.render.call(this);
    if (!this.isViewable()) {
      return;
    }
    context = this.game.canvasBufferContext;
    context.fillStyle = this.color;
    context.shadowColor = '#333';
    context.shadowBlur = 4;
    context.shadowOffsetY = 2;
    context.shadowOffsetX = 2;
    return context.fillRect(this.position.x - this.game.viewport.position.x, this.position.y - this.game.viewport.position.y, this.size.width, this.size.height);
  };
  Monster.prototype.isViewable = function() {
    if (this.position.x > this.game.viewport.position.x && this.position.y > this.game.viewport.position.y && this.position.x < this.game.viewport.position.x + this.game.viewport.size.width && this.position.y < this.game.viewport.position.y + this.game.viewport.size.height) {
      return true;
    }
    return false;
  };
  return Monster;
})();