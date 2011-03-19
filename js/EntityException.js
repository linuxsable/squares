var EntityException = Class.create({
    initialize: function(message) {
        this.message = message;
        this.name = 'EntityException';
    }
});