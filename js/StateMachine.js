// Finite state machine
var StateMachine = Class.create({
    initialize: function() {
        this.states = $H();
        this.activeState = null;
    },
    
    addState: function(state) {
        this.states.set(state.name, state);
    },
    
    setState: function(state) {
        if (this.activeState !== null) {
            this.activeState.exitActions();
        }
        this.activeState = this.states.get(state);
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