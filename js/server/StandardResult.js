module.exports = StandardResult;

function StandardResult(method, data) {
    this.error = false;
    this.method = method;
    this.data = data || {};
    this.meta = {};
}