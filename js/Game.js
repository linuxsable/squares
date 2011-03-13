var Game = (function() {
    var self                 = {},
        _canvas              = null,
        _canvasContext       = null,
        _canvasBuffer        = null,
        _canvasBufferContext = null,
        _loopInterval        = null,
        _loopSpeed           = 20,
        _canvasWidth         = 1024,
        _canvasHeight        = 600,
        _board               = null;
        
    /*
    * Module debugger.
    */
    self.debug = function() {
        debugger;
    };
        
    /*
    * Setup the game.
    */
    self.init = function() {
        initCanvas();
        initBoard();
        startLoop();
    };
    
    var initBoard = function() {
        _board = new Board(_canvasWidth, _canvasHeight);
    };
    
    /*
    * Setup the canvas.
    */
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
    
    var startLoop = function() {
        (function loopsiloo() {
            drawFrame();
            _loopInterval = setTimeout(loopsiloo, _loopInterval);
        })();
    };
    
    var drawFrame = function() {
        _canvasBufferContext.fillRect(25, 25, 15, 15);
        
        _canvasContext.clearRect(0, 0, _canvasWidth, _canvasHeight);
        _canvasContext.drawImage(_canvasBuffer, 0, 0);
    };
    
    return self;
})();