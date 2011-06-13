var State;
State = (function() {
  function State(name) {
    this.name = name;
  }
  State.prototype.doActions = function() {};
  State.prototype.checkConditions = function() {};
  State.prototype.entryActions = function() {};
  State.prototype.exitActions = function() {};
  return State;
})();