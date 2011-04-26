// State superclass for finite stat machine
var State = Class.create({
    initialize: function(name) {
        this.name = name;
    },
    
    doActions: function() {
        return;
    },
    
    checkConditions: function() {
        return;
    },
    
    entryActions: function() {
        return;
    },
    
    exitActions: function() {
        return;
    }
});