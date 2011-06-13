var TypeException;
TypeException = (function() {
  function TypeException(message) {
    TypeException.__super__.constructor.call(this, message);
    this.name = 'TypeException';
  }
  return TypeException;
})();