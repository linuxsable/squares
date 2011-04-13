var TypeException = Class.create(Exception, {
    initialize: function($super, message) {
        $super(message);
        this.name = 'TypeException';
    }
});