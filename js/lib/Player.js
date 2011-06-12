(function() {
  var Player;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Player = (function() {
    function Player() {
      Player.__super__.constructor.apply(this, arguments);
    }
    __extends(Player, Entity);
    Player.prototype.render = function() {
      var context;
      context = this.game.canvasBufferContext;
      context.fillStyle = this.color;
      context.shadowColor = '#ccc';
      context.shadowBlur = 2;
      context.shadowOffsetY = 2;
      context.shadowOffsetX = 2;
      return context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    };
    Player.prototype.move = function(direction) {
      Player.__super__.move.call(this, direction);
      return _sendToServer();
    };
    Player.prototype.update = function() {
      var k;
      k = this.keyHandler;
      if (k.isDown(k.UP)) {
        this.move('up');
      }
      if (k.isDown(k.DOWN)) {
        this.move('down');
      }
      if (k.isDown(k.LEFT)) {
        this.move('left');
      }
      if (k.isDown(k.RIGHT)) {
        this.move('right');
      }
      return this.mind.think();
    };
    Player.prototype._sendToServer = function() {
      var request;
      request = new StandardRequest('updatePlayer', {
        id: this.id,
        position: this.position
      });
      return this.game.socket.send(request);
    };
    return Player;
  })();
}).call(this);
