var StateMonsterFleeing;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
StateMonsterFleeing = (function() {
  function StateMonsterFleeing(monster) {
    this.monster = monster;
    StateMonsterFleeing.__super__.constructor.call(this, 'exploring');
  }
  __extends(StateMonsterFleeing, State);
  StateMonsterFleeing.prototype.doActions = function() {
    var colors, direction, movements, randomNumber;
    movements = ['up', 'down', 'right', 'left'];
    colors = ['pink', 'green', 'red', '#333', 'orange'];
    randomNumber = Helpers.generateRandomNumber(100);
    direction = movements[randomNumber % 4];
    return this.monster.move(direction);
  };
  StateMonsterFleeing.prototype.checkConditions = function() {
    var n, player;
    player = this.monster.game.getPlayer();
    n = 50;
    if ((player.position.x <= (this.monster.position.x + n) && player.position.x >= (this.monster.position.x - n)) && (player.position.y <= (this.monster.position.y + n) && player.position.y >= (this.monster.position.y - n))) {
      return 'fleeing';
    }
  };
  StateMonsterFleeing.prototype.entryActions = function() {
    this.monster.velocity = 0.3;
    return this.monster.color = '#333';
  };
  return StateMonsterFleeing;
})();