/*
Coffee rewrite of: http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/index.html
*/var onEachFrame;
if (window.webkitRequestAnimationFrame) {
  onEachFrame = function(cb) {
    var _cb;
    _cb = function() {
      cb();
      return webkitRequestAnimationFrame(_cb);
    };
    return _cb();
  };
} else if (window.mozRequestAnimationFrame) {
  onEachFrame = function(cb) {
    var _cb;
    _cb = function() {
      cb();
      return mozRequestAnimationFrame(_cb);
    };
    return _cb();
  };
} else {
  onEachFrame = function(cb) {
    return setInterval(cb, 1000 / 60);
  };
}
window.onEachFrame = onEachFrame;