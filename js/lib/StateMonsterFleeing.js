var StateMonsterExploring;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
StateMonsterExploring = (function() {
  function StateMonsterExploring(monster) {
    this.monster = monster;
    this.monster.velocity = 1;
    StateMonsterExploring.__super__.constructor.call(this, 'fleeing');
    this.num = 0;
  }
  __extends(StateMonsterExploring, State);
  StateMonsterExploring.prototype.doActions = function() {};
  StateMonsterExploring.prototype.checkConditions = function() {
    return 'exploring';
  };
  StateMonsterExploring.prototype.entryActions = function() {
    var colors, direction, movements, randomNumber, thing;
    movements = ['up', 'down', 'right', 'left'];
    colors = ['red', '#fff'];
    randomNumber = Helpers.generateRandomNumber(100);
    thing = randomNumber % 4;
    direction = movements[thing];
    this.monster.move(direction, 3);
    return this.monster.color = 'red';
  };
  return StateMonsterExploring;
})();