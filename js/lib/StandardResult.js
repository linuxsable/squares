module.exports.StandardResult = function(method, data) {
  this.method = method;
  this.data = data || {};
  this.error = false;
  this.meta = {};
};