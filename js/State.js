// State superclass for finite stat machine
var State = Class.extend({
    init: function(name) {
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