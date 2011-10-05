class Game
  constructor: ->
    @canvas = null
    @canvasWidth = 50
    @canvasHeight = 50
    @canvasContext = null
    @canvasBuffer = null
    @canvasBufferContext = null
    @fps = 60
    
    @entities = {
      player: null,
      monsters: []
    }
    
    @world = null
    @viewport = null
    
    # Do init setups
    @initCanvas()
    @initWorld()
    @initViewport()
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
    
  initControlEvents: ->
    @entities.player.initControlEvents()
  
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
    @renderEntities()
    
  # We now only want to render those entities
  # which are inside the current canvas.
  renderEntities: ->
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
      @entities.player.velocity = 2.5
  
  getPlayer: ->
    @entities.player
      
  initMonsters: ->
    for num in [250..1]
      coord = @world.getRandomCoordInside()
      size = new Size 12, 12
      color = '#888'
      monster = new Monster this, coord, size, color
      @entities.monsters.push monster
      
  initWorld: ->
    @world = new World this
  
  initViewport: ->
    @viewport = new Viewport this