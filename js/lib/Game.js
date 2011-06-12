(function() {
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
      this.intervalId = null;
      this.fps = 60;
      this.grid = null;
      this.board = null;
      this.entities = {
        player: null,
        monsters: []
      };
      this.socket = null;
      this.initCanvas();
      this.initBoard();
      this.initPlayer();
      this.initMonsters();
      this.initControlEvents();
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
    Game.prototype.initBoard = function() {
      return this.board = new Board(this.canvasWidth, this.canvasHeight);
    };
    Game.prototype.initControlEvents = function() {
      var player;
      player = this.entities.player;
      $(document).bind('keydown', __bind(function(e) {
        return player.keyHandler.onKeydown(e);
      }, this));
      return $(document).bind('keyup', __bind(function(e) {
        return player.keyHandler.onKeyup(e);
      }, this));
    };
    Game.prototype.startGame = function() {
      var interval, loops, maxFrameSkip, nextGameTick, skipTicks, that, _loopsi;
      loops = 0;
      skipTicks = 1000 / this.fps;
      maxFrameSkip = 10;
      nextGameTick = (new Date).getTime();
      that = this;
      interval = null;
      _loopsi = function() {
        loops = 0;
        while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
          that.initFrame();
          nextGameTick += skipTicks;
          loops++;
        }
        return that.drawFrame();
      };
      return window.onEachFrame(_loopsi);
    };
    Game.prototype.endGame = function() {
      return clearInterval(this.intervalId);
    };
    Game.prototype.initFrame = function() {
      this.updateEntities();
      return this;
    };
    Game.prototype.drawFrame = function() {
      this.renderToCanvasBuffer();
      this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.canvasContext.drawImage(this.canvasBuffer, 0, 0);
      return this;
    };
    Game.prototype.renderToCanvasBuffer = function() {
      var entity, subEntity, _i, _j, _len, _len2, _ref, _results;
      this.canvasBufferContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      _ref = this.entities;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        if ($.isArray(entity)) {
          for (_j = 0, _len2 = entity.length; _j < _len2; _j++) {
            subEntity = entity[_j];
            if (false === (subEntity instanceof Entity)) {
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
      var entity, subEntity, _i, _j, _len, _len2, _ref, _results;
      _ref = this.entities;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entity = _ref[_i];
        if ($.isArray(entity)) {
          for (_j = 0, _len2 = entity.length; _j < _len2; _j++) {
            subEntity = entity[_j];
            if (false === (subEntity instanceof Entity)) {
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
        return this.entities.player = new Player(this, new Coord(this.canvasWidth / 2, this.canvasHeight / 2), new Size(30, 30), '#008fc5');
      }
    };
    Game.prototype.initMonsters = function() {
      var num, _results;
      _results = [];
      for (num = 20; num >= 1; num--) {
        _results.push(this.entities.monsters.push(new Monster(this, Coord.getRandomInsideCanvas(this), new Size(20, 20), '#ef4135')));
      }
      return _results;
    };
    Game.prototype.initGrid = function() {
      this.grid = new Grid(new Size(this.canvasWidth, this.canvasHeight), '#ccc');
      return this.grid.render(this.canvasBufferContext);
    };
    return Game;
  })();
}).call(this);
