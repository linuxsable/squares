var TypeException = Exception.extend({
    init: function(message) {
        this._super(message);
        this.name = 'TypeException';
    }
});