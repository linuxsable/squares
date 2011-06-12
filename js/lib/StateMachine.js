(function() {
  var StateMachine;
  StateMachine = (function() {
    function StateMachine() {
      this.states = {};
      this.activeState = null;
    }
    StateMachine.prototype.addState = function(state) {
      return this.states[state.name] = state;
    };
    StateMachine.prototype.setState = function(state) {
      if (this.activeState != null) {
        this.activeState.exitActions();
      }
      this.activeState = this.states[state];
      return this.activeState.entryActions();
    };
    StateMachine.prototype.think = function() {
      var stateName;
      if (!(this.activeState != null)) {
        return;
      }
      this.activeState.doActions();
      stateName = this.activeState.checkConditions();
      if (stateName) {
        return this.setState(stateName);
      }
    };
    return StateMachine;
  })();
}).call(this);
