var KeyHandler;
KeyHandler = (function() {
  function KeyHandler() {
    this.pressed = {};
    this.KEYS = {
      W: 87,
      S: 83,
      A: 65,
      D: 68,
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      LEFT: 37,
      SPACE: 32
    };
  }
  KeyHandler.prototype.isDown = function(keyCode) {
    return this.pressed[keyCode];
  };
  KeyHandler.prototype.onKeydown = function(event) {
    return this.pressed[event.keyCode] = true;
  };
  KeyHandler.prototype.onKeyup = function(event) {
    return delete this.pressed[event.keyCode];
  };
  return KeyHandler;
})();