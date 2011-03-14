var Game = (function() {
    var self                 = {},
        _canvas              = null,
        _canvasContext       = null,
        _canvasBuffer        = null,
        _canvasBufferContext = null,
        _runLoop             = false,
        _loopSpeed           = 1000,
        _canvasWidth         = 1024,
        _canvasHeight        = 600,
        _board               = null,
        _entities            = {
            player: {},
            monsters: []
        };
        
    self.debug = function() {
        debugger;
    };
        
    self.init = function() {
        initCanvas();
        initBoard();
        startGame();
    };
    
    var initBoard = function() {
        _board = new Board(_canvasWidth, _canvasHeight);
    };
    
    var initCanvas = function() {
        _canvas = $('#game')[0];
        $(_canvas).attr({
			'width': _canvasWidth,
			'height': _canvasHeight
		});
		if (_canvas && _canvas.getContext) {
            _canvasContext = _canvas.getContext('2d');
            _canvasBuffer = $('<canvas></canvas>')[0];
            _canvasBuffer.width = _canvasWidth;
            _canvasBuffer.height = _canvasHeight;
            _canvasBufferContext = _canvasBuffer.getContext('2d');    
            return true;
		}
		return false;
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
        _canvasContext.clearRect(0, 0, _canvasWidth, _canvasHeight);
        _canvasContext.drawImage(_canvasBuffer, 0, 0);
    };
    
    // Write everything temporarily to the buffer canvas
    var renderToCanvasBuffer = function() {
        // Start the buffer fresh
        _canvasBufferContext.clearRect(0, 0, _canvasWidth, _canvasHeight);
        
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
            var player = new Player(
                new Coord(25, 25),
                new Size(15, 15),
                '#333'
            );
            _entities.player = player;
        }
    };
    
    var initMonsters = function() {
        // Setup the monsters
    };

    return self;
})();