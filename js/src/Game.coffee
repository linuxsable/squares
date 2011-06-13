class Game
  constructor: ->
    @canvas = null
    @canvasWidth = 1024
    @canvasHeight = 600
    @canvasContext = null
    @canvasBuffer = null
    @canvasBufferContext = null
    
    @intervalId = null
    @fps = 60
    @grid = null
    @board = null
    
    @entities = {
      player: null,
      monsters: []
    }
    
    # Do init setups
    @initCanvas()
    @initBoard()
    @initPlayer()
    @initMonsters()
    @initControlEvents()
    
    # Start that ish!
    @startGame()
    
  initCanvas: ->
    @canvas = $('#game')[0]
    $(@canvas).attr {
      width: @canvasWidth,
      height: @canvasHeight
    }
    
    if @canvas and @canvas.getContext
      @canvasContext = @canvas.getContext('2d')
      @canvasBuffer = $('<canvas>')[0]
      @canvasBuffer.width = @canvasWidth
      @canvasBuffer.height = @canvasHeight
      @canvasBufferContext = @canvasBuffer.getContext('2d')
      return true
      
    false
  
  initBoard: ->
    @board = new Board(@canvasWidth, @canvasHeight)
    
  initControlEvents: ->
    player = @entities.player
    $(document).bind 'keydown', (e) =>
      player.keyHandler.onKeydown(e)
    $(document).bind 'keyup', (e) =>
      player.keyHandler.onKeyup(e)
  
  startGame: ->
    skipTicks = 1000 / @fps
    maxFrameSkip = 10
    nextGameTick = (new Date).getTime()
    
    window.onEachFrame =>
      loops = 0
      while (new Date).getTime() > nextGameTick and loops < maxFrameSkip
        @initFrame()
        nextGameTick += skipTicks
        loops++
      @drawFrame()
      
  # TODO: this doesn't work now
  endGame: ->
    clearInterval(@intervalId)
  
  # This runs right before the frame
  # gets written to the buffer
  initFrame: ->
    @updateEntities()
    this
  
  # This writes the buffer canvas to the real one
  drawFrame: ->
    @renderToCanvasBuffer()
    @canvasContext.clearRect(0, 0, @canvasWidth, @canvasHeight)
    @canvasContext.drawImage(@canvasBuffer, 0, 0)
    this
    
  # Write everything temporarily to the buffer canvas
  renderToCanvasBuffer: ->
    # Start the buffer fresh
    @canvasBufferContext.clearRect(0, 0, @canvasWidth, @canvasHeight)
    
    # Loop through all the known entites
    # and run their individual render methods    
    for key, entity of @entities
      if $.isArray entity
        for subKey, subEntity of entity
          return if not (subEntity instanceof Entity)
          if 'function' == typeof subEntity.render
            subEntity.render()
      else
        return if not entity
        if 'function' == typeof entity.render
          entity.render()
    
  updateEntities: ->
    for key, entity of @entities
      if $.isArray entity
        for subKey, subEntity of entity
          return if not (subEntity instanceof Entity)
          if 'function' == typeof subEntity.update
            subEntity.update()
      else
        return if not entity
        if 'function' == typeof entity.update
          entity.update()
          
  initPlayer: ->
    # There's only one player in the game, YOU
    if false == (@entities.player instanceof Player)
      @entities.player = new Player(
        this,
        new Coord(@canvasWidth / 2, @canvasHeight / 2),
        new Size(30, 30),
        '#008fc5'
      )
  
  getPlayer: ->
    @entities.player
      
  initMonsters: ->
    for num in [100..1]
      @entities.monsters.push(new Monster(
        this,
        Coord.getRandomInsideCanvas(this),
        new Size(12, 12),
        '#888'
      ))
      
  initGrid: -> 
    # @grid = new Grid(
    #   new Size(@canvasWidth, @canvasHeight)
    #   '#ccc'
    # )