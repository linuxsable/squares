var Game = (function() {
    var self                 = {},
        _canvas              = null,
        _canvasContext       = null,
        _canvasBuffer        = null,
        _canvasBufferContext = null,
        _runLoop             = false,
        _loopSpeed           = 30,
        _entities            = {
            player: {},
            monsters: []
        };
        
    self.board = null;
    self.canvasWidth = 1024;
    self.canvasHeight = 600;
        
    self.debug = function() {
        debugger;
    };
        
    self.init = function() {
        initCanvas();
        initBoard();
        initControlEvents();
        startGame();
    };
    
    var initCanvas = function() {
        _canvas = $('#game')[0];
        $(_canvas).attr({
			'width': self.canvasWidth,
			'height': self.canvasHeight
		});
		if (_canvas && _canvas.getContext) {
            _canvasContext = _canvas.getContext('2d');
            _canvasBuffer = $('<canvas></canvas>')[0];
            _canvasBuffer.width = self.canvasWidth;
            _canvasBuffer.height = self.canvasHeight;
            _canvasBufferContext = _canvasBuffer.getContext('2d');    
            return true;
		}
		return false;
    };
    
    var initBoard = function() {
        self.board = new Board(self.canvasWidth, self.canvasHeight);
    };
    
    // Handle keyboard input for controls
    var initControlEvents = function() {
        $(document).keypress(function(e) {
            // Player controls
            var player = _entities.player;
 			switch (e.keyCode) {
				// Key: w
				case 119:
					player.move('up');
					break;
				// Key: s
				case 115:
					player.move('down');
					break;
				// Key: d
				case 100:
					player.move('right');
					break;
				// Key: a    
				case 97:
					player.move('left');
					break;
				case 32:
				    player.teleport();
				    break;
			}
		});
    };
    
    var startGame = function() {
        initPlayer();
        initMonsters();
        
        // Start the game loop
        _runLoop = true;
        (function loopsiloopsiloo() {
            if (!_runLoop) return;
            initFrame();
            drawFrame();
            _loopInterval = setTimeout(loopsiloopsiloo, _loopSpeed);
        })();
    };
    
    var endGame = function() {
        _runLoop = false;
    };
    
    // This runs right before the frame gets
    // written to the buffer.
    var initFrame = function() {
        updateEntities();
    };
    
    // This writes the buffer canvas to the real one
    var drawFrame = function() {
        renderToCanvasBuffer();
        _canvasContext.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
        _canvasContext.drawImage(_canvasBuffer, 0, 0);
    };
    
    // Write everything temporarily to the buffer canvas
    var renderToCanvasBuffer = function() {
        // Start the buffer fresh
        _canvasBufferContext.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
        
        // Loop through all the known entities
        // and run their individual render methods.
        $.each(_entities, function(key) {
            var category = this;
            if ($.isArray(category)) {
                $.each(category, function(key) {
                    this.render(_canvasBufferContext);
                });
            } else {
                this.render(_canvasBufferContext);
            }
        });
    };
    
    var updateEntities = function() {
        $.each(_entities, function(key) {
            var category = this;
            if ($.isArray(category)) {
                $.each(category, function(key) {
                    if (typeof this.update == 'function') {
                        this.update();
                    }
                });
            } else {
                if (typeof this.update == 'function') {
                    this.update();
                }
            }
        });
    };
    
    var initPlayer = function() {
        // There's only one player in the game, YOU
        if (typeof _entities.player != 'Player') {
            var coord = new Coord(self.canvasWidth / 2, self.canvasHeight / 2);
            var player = new Player(coord, new Size(15, 15), '#333');
            _entities.player = player;
        }
    };
    
    var initMonsters = function() {
        // Setup the monsters
    };
    
    var initGrid = function() {
        
    };

    return self;
})();