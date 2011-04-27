var Exception = Class.extend({
    init: function(message) {
        this.message = message;
        this.name = null;
    }
});