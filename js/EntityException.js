var EntityException = Class.extend(Exception, {
    init: function(message) {
        this._super(message);
        this.name = 'EntityException';
    }
});