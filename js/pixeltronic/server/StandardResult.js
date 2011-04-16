exports.StandardResult = (function() {
    function StandardResult(method, data) {
        this.error = false;
        this.method = method;
        this.data = data || {};
        this.meta = {};
    }
    return StandardResult;
})();