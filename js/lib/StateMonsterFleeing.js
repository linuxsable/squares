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
    StateMonsterFleeing.__super__.constructor.call(this, 'fleeing');
    this.num = 0;
  }
  __extends(StateMonsterFleeing, State);
  StateMonsterFleeing.prototype.doActions = function() {
    var direction, movements, randomNumber, thing;
    movements = ['up', 'down', 'right', 'left'];
    randomNumber = Helpers.generateRandomNumber(100);
    thing = randomNumber % 4;
    direction = movements[thing];
    return this.monster.move(direction);
  };
  StateMonsterFleeing.prototype.checkConditions = function() {
    var n, player;
    player = this.monster.game.getPlayer();
    n = 50;
    if ((player.position.x >= (this.monster.position.x + n) || player.position.x <= (this.monster.position.x - n)) || (player.position.y >= (this.monster.position.y + n) || player.position.y <= (this.monster.position.y - n))) {
      return 'exploring';
    }
  };
  StateMonsterFleeing.prototype.entryActions = function() {
    this.monster.velocity = 2.5;
    return this.monster.color = 'red';
  };
  return StateMonsterFleeing;
})();