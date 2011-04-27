// Finite state machine
var StateMachine = Class.extend({
    init: function() {
        this.states = {};
        this.activeState = null;
    },
    
    addState: function(state) {
        this.states[state.name] = state;
    },
    
    setState: function(state) {
        if (this.activeState !== null) {
            this.activeState.exitActions();
        }
        this.activeState = this.states[state];
        this.activeState.entryActions();
    },
    
    think: function() {
        if (this.activeState === null) {
            return;
        }
        this.activeState.doActions();
        var newStateName = this.activeState.checkConditions();
        if (newStateName) {
            this.setState(newStateName);
        }
    }
});