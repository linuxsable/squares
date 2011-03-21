var EntityException = Class.create(Exception, {
    initialize: function($super, message) {
        $super(message);
        this.name = 'EntityException';
    }
});