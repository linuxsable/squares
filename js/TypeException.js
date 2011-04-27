var TypeException = Class.extend(Exception, {
    init: function(message) {
        this._super(message);
        this.name = 'TypeException';
    }
});