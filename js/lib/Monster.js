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
  function Monster(game, coord, size, color) {
    Monster.__super__.constructor.call(this, game, coord, size, color);
    this.mind.addState(new StateMonsterExploring(this));
    this.mind.addState(new StateMonsterStalled(this));
    this.mind.setState('exploring');
  }
  __extends(Monster, Entity);
  Monster.prototype.render = function() {
    var context;
    context = this.game.canvasBufferContext;
    context.fillStyle = this.color;
    context.shadowColor = '#333';
    context.shadowBlur = 2;
    context.shadowOffsetY = 2;
    context.shadowOffsetX = 2;
    return context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  };
  return Monster;
})();