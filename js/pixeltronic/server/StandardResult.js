exports.StandardResult = (function() {
    function StandardResult() {
        this.error = false;
        this.method = null;
        this.data = {};
        this.meta = {};
    }
    return StandardResult;
})();