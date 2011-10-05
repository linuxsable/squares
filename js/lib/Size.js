var Size;
Size = (function() {
  function Size(width, height) {
    this.width = width;
    this.height = height;
  }
  Size.prototype.equalTo = function(size) {
    if (!(size instanceof Size)) {
      return false;
    }
    if (size.width !== this.width) {
      return false;
    }
    if (size.height !== this.height) {
      return false;
    }
    return true;
  };
  return Size;
})();