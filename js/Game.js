var Game = Class.create({
    initialize: function(msg) {
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
        this.entities = $H({
            player: null,
            monsters: []
        });
        
        this.initializeCanvas();
        this.initializeBoard();
        this.initializeControlEvents();
        this.initializePlayer();
        this.initializeMonsters();
        
        this.startGame();
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
        this.board = new Board(this.canvasWidth, this.canvasHeight);
    },
    
    // Handle keyboard input for controls
    initializeControlEvents: function() {
        var that = this;
        $(document).observe('keydown', function(e) {
            // Player controls
            var player = that.entities.get('player');
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
        this.entities.each(function(entity) {
            if (Object.isArray(entity.value)) {
                entity.value.each(function(subEntity) {
                    if (false === (subEntity instanceof Entity)) {
                        return;
                    }
                    if (Object.isFunction(subEntity.render)) {
                        subEntity.render();
                    }
                });
            } else {
                if (!entity.value) return;
                if (Object.isFunction(entity.value.render)) {
                    entity.value.render();
                }
            }
        });
    },
    
    updateEntities: function() {
        this.entities.each(function(entity) {
            if (Object.isArray(entity.value)) {
                entity.value.each(function(subEntity) {
                    if (false === (subEntity instanceof Entity)) {
                        return;
                    }
                    if (Object.isFunction(subEntity.update)) {
                        subEntity.update();
                    }
                });
            } else {
                if (!entity.value) return;
                if (Object.isFunction(entity.value.update)) {
                    entity.value.update();
                }
            }
        });
    },
    
    initializePlayer: function() {
        // There's only one player in the game, YOU
        if (false === (this.entities.get('player') instanceof Player)) {
            this.entities.set('player', new Player(
                this,
                new Coord(this.canvasWidth / 2, this.canvasHeight / 2),
                new Size(10, 10),
                '#008fc5'
            ));
        }
    },
    
    initializeMonsters: function() {
        // Setup the monsters
        for (var i = 0; i < 200; i++) {
            this.entities.get('monsters').push(new Monster(
                this,
                Coord.getRandomInsideBoard(this),
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
    }
});