var StateMonsterStalled;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
StateMonsterStalled = (function() {
  StateMonsterStalled.monster = null;
  __extends(StateMonsterStalled, State);
  StateMonsterStalled.rendered = false;
  function StateMonsterStalled(monster) {
    this.monster = monster;
    StateMonsterStalled.__super__.constructor.call(this, 'stalled');
  }
  StateMonsterStalled.prototype.doActions = function() {
    if (this.rendered) {
      this.monster.incrementSize().incrementSize();
      return this.rendered = false;
    } else {
      this.monster.decrementSize().decrementSize();
      return this.rendered = true;
    }
  };
  StateMonsterStalled.prototype.checkConditions = function() {};
  StateMonsterStalled.prototype.entryActions = function() {
    return this.monster.color = 'yellow';
  };
  return StateMonsterStalled;
})();