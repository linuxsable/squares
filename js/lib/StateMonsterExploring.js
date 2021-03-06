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
  __extends(StateMonsterExploring, State);
  function StateMonsterExploring(monster) {
    this.monster = monster;
    StateMonsterExploring.__super__.constructor.call(this, 'exploring');
  }
  StateMonsterExploring.prototype.doActions = function() {
    var colors, direction, movements, randomNumber;
    movements = ['up', 'down', 'right', 'left'];
    colors = ['pink', 'green', 'red', '#333', 'orange'];
    randomNumber = Helpers.generateRandomNumber(100);
    direction = movements[randomNumber % 4];
    return this.monster.move(direction);
  };
  StateMonsterExploring.prototype.checkConditions = function() {};
  StateMonsterExploring.prototype.entryActions = function() {
    this.monster.velocity = 1;
    return this.monster.color = '#333';
  };
  return StateMonsterExploring;
})();