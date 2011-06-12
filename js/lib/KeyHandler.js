(function() {
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
      return this.pressed.keyCode;
    };
    KeyHandler.prototype.onKeydown = function(event) {
      var key;
      key = event.keyCode;
      return this.pressed.key = true;
    };
    KeyHandler.prototype.onKeyup = function(event) {
      var key;
      key = event.keyCode;
      return delete this.pressed.key;
    };
    return KeyHandler;
  })();
}).call(this);
