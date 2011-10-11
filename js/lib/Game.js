var Game;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Game = (function() {
  function Game() {
    this.canvas = null;
    this.canvasWidth = 1024;
    this.canvasHeight = 600;
    this.canvasContext = null;
    this.canvasBuffer = null;
    this.canvasBufferContext = null;
    this.fps = 60;
    this.server = {
      HOST: 'http://localhost',
      PORT: 3000
    };
    this.socket = null;
    this.entities = {
      player: null,
      players: [],
      monsters: []
    };
    this.world = null;
    this.viewport = null;
    this.initCanvas();
    this.initWorld();
    this.initViewport();
    this.initPlayer();
    this.initMonsters();
    this.initControlEvents();
    this.connectToServer();
    this.startGame();
  }
  Game.prototype.initCanvas = function() {
    this.canvas = $('#game')[0];
    $(this.canvas).attr({
      width: this.canvasWidth,
      height: this.canvasHeight
    });
    if (this.canvas && this.canvas.getContext) {
      this.canvasContext = this.canvas.getContext('2d');
      this.canvasBuffer = $('<canvas>')[0];
      this.canvasBuffer.width = this.canvasWidth;
      this.canvasBuffer.height = this.canvasHeight;
      this.canvasBufferContext = this.canvasBuffer.getContext('2d');
      return true;
    }
    return false;
  };
  Game.prototype.initControlEvents = function() {
    this.entities.player.initControlEvents();
    return this.viewport.initControlEvents();
  };
  Game.prototype.startGame = function() {
    var maxFrameSkip, nextGameTick, skipTicks;
    skipTicks = 1000 / this.fps;
    maxFrameSkip = 10;
    nextGameTick = (new Date).getTime();
    return window.onEachFrame(__bind(function() {
      var loops;
      loops = 0;
      while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
        this.initFrame();
        nextGameTick += skipTicks;
        loops++;
      }
      return this.drawFrame();
    }, this));
  };
  Game.prototype.endGame = function() {};
  Game.prototype.initFrame = function() {
    this.updateEntities();
    this.viewport.update();
    return this;
  };
  Game.prototype.drawFrame = function() {
    this.renderToCanvasBuffer();
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvasContext.drawImage(this.canvasBuffer, 0, 0);
    return this;
  };
  Game.prototype.renderToCanvasBuffer = function() {
    this.canvasBufferContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    return this.renderEntities();
  };
  Game.prototype.renderEntities = function() {
    var entity, key, subEntity, subKey, _ref, _results;
    _ref = this.entities;
    _results = [];
    for (key in _ref) {
      entity = _ref[key];
      if ($.isArray(entity)) {
        for (subKey in entity) {
          subEntity = entity[subKey];
          if (!(subEntity instanceof Entity)) {
            return;
          }
          if ('function' === typeof subEntity.render) {
            subEntity.render();
          }
        }
      } else {
        if (!entity) {
          return;
        }
        if ('function' === typeof entity.render) {
          entity.render();
        }
      }
    }
    return _results;
  };
  Game.prototype.updateEntities = function() {
    var entity, key, subEntity, subKey, _ref, _results;
    _ref = this.entities;
    _results = [];
    for (key in _ref) {
      entity = _ref[key];
      if ($.isArray(entity)) {
        for (subKey in entity) {
          subEntity = entity[subKey];
          if (!(subEntity instanceof Entity)) {
            return;
          }
          if ('function' === typeof subEntity.update) {
            subEntity.update();
          }
        }
      } else {
        if (!entity) {
          return;
        }
        if ('function' === typeof entity.update) {
          entity.update();
        }
      }
    }
    return _results;
  };
  Game.prototype.initPlayer = function() {
    if (false === (this.entities.player instanceof Player)) {
      this.entities.player = new Player(this, new Coord(this.canvasWidth / 2, this.canvasHeight / 2), new Size(30, 30), '#008fc5');
      return this.entities.player.velocity = 5;
    }
  };
  Game.prototype.initMonsters = function() {
    var color, coord, monster, num, size, _results;
    _results = [];
    for (num = 250; num >= 1; num--) {
      coord = this.world.getRandomCoordInside();
      size = new Size(12, 12);
      color = '#888';
      monster = new Monster(this, coord, size, color);
      _results.push(this.entities.monsters.push(monster));
    }
    return _results;
  };
  Game.prototype.initWorld = function() {
    return this.world = new World(this);
  };
  Game.prototype.initViewport = function() {
    return this.viewport = new Viewport(this);
  };
  Game.prototype.connectToServer = function() {
    if (this.socket !== null) {
      throw 'Already connected to server';
    }
    this.socket = io.connect(this.server.HOST, {
      port: this.server.PORT
    });
    return this.socket.on('connect', __bind(function() {
      $('#chat').prepend('<div>Connected to server.</div>');
      this.entities.player.id = parseInt(this.socket.socket.sessionid);
      this.socket.emit('player_update', {
        id: this.entities.player.id,
        position: this.entities.player.position
      });
      this.socket.on('players_sync', __bind(function(req) {
        return $.each(req.players, __bind(function(k, v) {
          if (parseInt(v.id) !== this.entities.player.id) {
            return this.entities.players.push(new Player(this, new Coord(v.position.x, v.position.y), new Size(30, 30), '#fff', parseInt(v.id)));
          }
        }, this));
      }, this));
      this.socket.on('player_connected', __bind(function(req) {
        return $('#chat').prepend('<div>Player connected #' + req.player.id + '</div>');
      }, this));
      return this.socket.on('player_disconnected', function(d) {
        return $('#chat').prepend('<div>Player disconnected #' + d.id + '</div>');
      });
    }, this));
  };
  return Game;
})();