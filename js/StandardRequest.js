var StandardRequest = Class.extend({
    init: function(method, data) {
        this.method = method;
        this.data = data || {};
    }
});