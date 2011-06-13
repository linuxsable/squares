var StandardRequest;
StandardRequest = (function() {
  function StandardRequest(method, data) {
    this.method = method;
    this.data = data || {};
  }
  return StandardRequest;
})();