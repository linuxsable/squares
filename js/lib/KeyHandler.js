var KeyHandler;
KeyHandler = (function() {
  function KeyHandler() {
    this.pressed = {};
    this.UP = 87;
    this.DOWN = 83;
    this.RIGHT = 68;
    this.LEFT = 65;
    this.SPACE = 32;
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