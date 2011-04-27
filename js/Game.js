var Game = Class.extend({
    init: function(msg) {
        this.canvas = null;
        this.canvasWidth = 900;
        this.canvasHeight = 400;
        this.canvasContext = null;
        this.canvasBuffer = null;
        this.canvasBufferContext = null;
        this.intervalId = null;
        this.fps = 60;
        this.grid = null;
        this.board = null;
        this.entities = {
            player: null,
            dudes: [],
            monsters: []
        };
        this.socket = null;
        
        this.initCanvas();
        this.initializeBoard();
        this.initializePlayer();
        this.initializeControlEvents();
        // this.initializeMonsters();
        this.initializeSocket();
        
        this.startGame();
    },
    
    initCanvas: function() {
        this.canvas = $('#game');
        this.canvas.attr({
            width: this.canvasWidth,
            height: this.canvasHeight
        });
        if (this.canvas && this.canvas.getContext) {
            this.canvasContext = this.canvas.getContext('2d');
            this.canvasBuffer = $('<canvas>');
            this.canvasBuffer.width = this.canvasWidth;
            this.canvasBuffer.height = this.canvasHeight;
            this.canvasBufferContext = this.canvasBuffer.getContext('2d');    
            return true;
        }
        return false;
    },
    
    initializeBoard: function() {
        this.board = new Board(this.canvasWidth, this.canvasHeight);
    },
    
    // Handle keyboard input for controls
    initializeControlEvents: function() {
        var player = this.entities.player;
        $(document).bind('keydown', function(e) {
            player.keyHandler.onKeydown(e);
        });
        $(document).bind('keyup', function(e) {
            player.keyHandler.onKeyup(e);
        });
    },
    
    startGame: function() {
        var loops = 0,
            skipTicks = 1000 / this.fps,
            maxFrameSkip = 10,
            nextGameTick = (new Date).getTime(),
			that = this,
			interval;
		
        var _loopsi = function() {
			loops = 0;
            while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
                that.initializeFrame();
                nextGameTick += skipTicks;
                loops++;
            }
            that.drawFrame();
        };
        window.onEachFrame(_loopsi);
    },

    // TODO: this doesn't work now
    endGame: function() {
        return clearInterval(this.intervalId);
    },
    
    // This runs right before the frame gets
    // written to the buffer.
    initializeFrame: function() {
        this.updateEntities();
        return this;
    },
    
    // This writes the buffer canvas to the real one
    drawFrame: function() {
        this.renderToCanvasBuffer();
        this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.canvasContext.drawImage(this.canvasBuffer, 0, 0);
        return this;
    },
    
    // Write everything temporarily to the buffer canvas
    renderToCanvasBuffer: function() {
        // Start the buffer fresh
        this.canvasBufferContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        // Loop through all the known entities
        // and run their individual render methods.
        $.each(this.entities, function(index, entity) {
            if ($.isArray(entity)) {
                $.each(entity, function(index, subEntity) {
                    if (false === (subEntity instanceof Entity)) {
                        return;
                    }
                    if (typeof subEntity.render === 'function') {
                        subEntity.render();
                    }
                });
            } else {
                if (!entity) return;
                if (typeof entity.render === 'function') {
                    entity.render();
                }
            }
        });
    },
    
    updateEntities: function() {
        $.each(this.entities, function(index, entity) {
            if ($.isArray(entity)) {
                $.each(entity, function(index, subEntity) {
                    if (false === (subEntity instanceof Entity)) {
                        return;
                    }
                    if (typeof subEntity.update === 'function') {
                        subEntity.update();
                    }
                });
            } else {
                if (!entity) return;
                if (typeof entity.update === 'function') {
                    entity.update();
                }
            }
        });
    },
    
    initializePlayer: function() {
        // There's only one player in the game, YOU
        if (false === (this.entities.player instanceof Player)) {
            this.entities.player = new Player(
                this,
                new Coord(this.canvasWidth / 2, this.canvasHeight / 2),
                new Size(30, 30),
                '#008fc5'
            );
        }
    },
    
    initializeMonsters: function() {
        // Setup the monsters
        for (var i = 0; i < 20; i++) {
            this.entities.monsters.push(new Monster(
                this,
                Coord.getRandomInsideCanvas(this),
                new Size(20, 20),
                '#ef4135'
            ));
        };
    },
    
    initializeGrid: function() {
        this.grid = new Grid(
            new Size(this.canvasWidth, this.canvasHeight),
            '#ccc'
        );
        this.grid.render(this.canvasBufferContext);
    },
    
    initializeSocket: function() {
        var that = this;
        
        this.socket = new io.Socket('localhost', {
            port: 8080,
        });
        
        this.socket.on('connect', function() {
            var player = that.entities.player;
            player.id = this.transport.sessionid;
            
            // Get list of clients connected
            // Create an entity for them with their current coords
            l('connected!');
        });
        
        this.socket.on('disconnect', function(obj) {
            l('disconnected!');
        });
        
        this.socket.on('message', function(result) {
            switch (result.method) {
                // Will only run once to give current
                // players and their positions
                case 'connectedPlayers':
                    var playerPositions = result.data.playerPositions;
                    l(playerPositions);
                    $.each(playerPositions, function(index, _dude) {
                        var _playerId = that.entities.player.id;
                        var _dudeId = _dude[0];                        
                        if (_dudeId != _playerId) {
                            // Create the coords entities initially
                            l(_dudeId);
                        }
                    });
                    break;
                
                case 'numPlayers':
                    l('number of players on server: ' + result.data.numPlayers);
                    break;
                    
                case 'updatePlayer':
                    // Update the dudes coords
                    l(result);
                    break;
                
                default:
                    console.error('ERROR: Bad result method ' + result.method);
            }
		});
		
		this.socket.connect();
		
        // Request for number of players
		var request = new StandardRequest('numPlayers');
		this.socket.send(request);
    },
    
    initializeDudes: function() {
        
    }
});