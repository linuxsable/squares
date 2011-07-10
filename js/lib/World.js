var World;
World = (function() {
  function World(game, width, height) {
    this.game = game;
    this.width = width != null ? width : 2000;
    this.height = height != null ? height : 2000;
    this.mind = new StateMachine;
    this.entities = {};
  }
  World.prototype.getWidth = function() {
    return this.width;
  };
  World.prototype.getHeight = function() {
    return this.height;
  };
  World.prototype.update = function() {
    return this.mind.think();
  };
  World.prototype.render = function() {};
  return World;
})();