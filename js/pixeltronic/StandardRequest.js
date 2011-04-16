var StandardRequest = Class.create({
    initialize: function(method, data) {
        this.method = method;
        this.data = data || {};
    }
});