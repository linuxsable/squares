var Game = Class.create({
    initialize: function(msg) {
        this.canvas = null;
        this.canvasWidth = 1024;
        this.canvasHeight = 600;
        this.canvasContext = null;
        this.canvasBuffer = null;
        this.canvasBufferContext = null;
        this.runLoop = false;
        this.loopSpeed = 30;
        this.grid = null;
        this.board = null;
        this.entities = $H({
            player: $H({}),
            monsters: []
        }); 
    },
    
    initializeCanvas: function() {
        this.canvas = $('game');
        this.canvas.writeAttribute({
            'width': this.canvasWidth,
            'height': this.canvasHeight
        });
        if (this.canvas && this.canvas.getContext) {
            this.canvasContext = this.canvas.getContext('2d');
            this.canvasBuffer = new Element('canvas');
            this.canvasBuffer.width = this.canvasWidth;
            this.canvasBuffer.height = this.canvasHeight;
            this.canvasBufferContext = this.canvasBuffer.getContext('2d');    
            return true;
        }
        return false;
    },
    
    initializeBoard: function() {
        this.board = {};
    }
});

var squares = new Game('hi');
squares.test;

var Game = (function() {
    var self                 = {},
        _canvas              = null,
        _canvasContext       = null,
        _canvasBuffer        = null,
        _canvasBufferContext = null,
        _runLoop             = false,
        _loopSpeed           = 30,
        _grid                = {},
        _entities            = $H({
            player: $H({}),
            monsters: []
        });
        
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
        _canvas = $('game');
        _canvas.writeAttribute({
            'width': self.canvasWidth,
			'height': self.canvasHeight
        });
		if (_canvas && _canvas.getContext) {
            _canvasContext = _canvas.getContext('2d');
            _canvasBuffer = new Element('canvas');
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
        $(document).observe('keydown', function(e) {
            // Player controls
            var player = _entities.player;
            switch (e.keyCode) {
                // Key: w
                case 87:
                    player.move('up');
                    break;
                // Key: s
                case 83:
                    player.move('down');
                    break;
                // Key: d
                case 68:
                    player.move('right');
                    break;
                // Key: a    
                case 65:
                    player.move('left');
                    break;
                // Key: spacebar
                case 32:
                    player.teleport();
                    break;
            }
        });
    };
    
    var startGame = function() {
        initGrid();
        initPlayer();
        initMonsters();
        
        // Start the game loop
        _runLoop = true;
        (function loopsiloopsiloo() {
            if (!_runLoop) return;
            initFrame();
            drawFrame();
            setTimeout(loopsiloopsiloo, _loopSpeed);
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
        _entities.each(function(entity) {
            if (Object.isArray(entity[0])) {
                entity[0].each(function(subEntity) {
                    subEntity[0].render(_canvasBufferContext);
                });
            } else {
                entity[0].render(_canvasBufferContext);
            }
        });
    };
    
    var updateEntities = function() {
        _entities.each(function(entity) {
            if (Object.isArray(entity[0])) {
                entity[0].each(function(entity) {
                    entity[0].update();
                });
            } else {
                entity[0].update();
            }
        });
    };
    
    var initPlayer = function() {
        // There's only one player in the game, YOU
        if (typeof _entities.player != 'Player') {
            var coord = new Coord(self.canvasWidth / 2, self.canvasHeight / 2);
            var player = new Player(coord, new Size(25, 25), '#333');
            _entities.player = player;
        }
    };
    
    var initMonsters = function() {
        // Setup the monsters
    };
    
    var initGrid = function() {
        _grid = new Grid(
            new Size(self.canvasWidth, self.canvasHeight),
            '#cccccc'
        );
        _grid.render(_canvasBufferContext);
    };

    return self;
})();
