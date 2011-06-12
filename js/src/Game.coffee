class Game
  constructor: ->
    @canvas = null
    @canvasWidth = 400
    @canvasHeight = 400
    @canvasContext = null
    @canvasBuffer = null
    @canvasBufferContext = null
    
    @intervalId = null
    @fps = 60
    @grid = null
    @board = null
    
    @entities = {
      player: null,
      dudes: [],
      monsters: []
    }
    @socket = null
    
    # Do init setups
    @initCanvas()
    @initBoard()
    @initPlayer()
    @initControlEvents()
    @initSocket()
    
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
      
    return false
  
  initBoard: ->
    @board = new Board(@canvasWidth, @canvasHeight)
    
  initControlEvents: ->
    player = @entities.player
    $(document).bind 'keydown', (e) =>
      player.keyHandler.onKeydown(e)
    $(document).bind 'keyup', (e) =>
      player.keyHandler.onKeyup(e)
  
  startGame: ->
    loops = 0
    skipTicks = 1000 / @fps
    maxFrameSkip = 10
    nextGameTick = (new Date).getTime()
    that = this
    interval = null
    
    _loopsi = ->
      loops = 0
      while (new Date).getTime() > nextGameTick and loops < maxFrameSkip
        that.initFrame()
        nextGameTick += skipTicks
        loops++
      that.drawFrame()
    
    window.onEachFrame(_loopsi)
    
  # TODO: this doesn't work now
  endGame: ->
    return clearInterval(@intervalId)
  
  # This runs right before the frame
  # gets written to the buffer
  initFrame: ->
    @updateEntities()
    return this
  
  # This writes the buffer canvas to the real one
  drawFrame: ->
    @renderToCanvasBuffer()
    @canvasContext.clearRect(0, 0, @canvasWidth, @canvasHeight)
    @canvasContext.drawImage(@canvasBuffer, 0, 0)
    return this
    
  # Write everything temporarily to the buffer canvas
  renderToCanvasBuffer: ->
    # Start the buffer fresh
    @canvasBufferContext.clearRect(0, 0, @canvasWidth, @canvasHeight)
    
    # Loop through all the known entites
    # and run their individual render methods
    for entity in @entities
      if $.isArray(entity)  
        for subEntity in entity
          if false == (subEntity instanceof Entity)
            return
          if 'function' == typeof subEntity.render
            subEntity.render()
      else
        return if not entity
        if 'function' == typeof entity.render
          entity.render()
          
  updateEntities: ->
    for entity in @entities
      if $.isArray(entity)  
        for subEntity in entity
          if false == (subEntity instanceof Entity)
            return
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
      
  initMonsters: ->
    for num in [20..1]
      @entities.monsters.push(new Monster(
        this,
        Coord.getRandomInsideCanvas(this),
        new Size(20, 20),
        '#ef4135'
      ))
      
  initGrid: -> 
    @grid = new Grid(
      new Size(@canvasWidth, @canvasHeight)
      '#ccc'
    )
    @grid.render(@canvasBufferContext)
    
  # Experimental multiplayer
  initSocket: ->
    that = this
    
    @socket = new io.Socket('localhost', port: 8080)
    
    @socket.on 'connect', ->
      player = @entities.player
      player.id = this.transport.sessionId
      l('connected!')
      
    @socket.on 'disconnect', (obj) ->
      l('disconnected')
      
    @socket.on 'message', (result) ->
      playerId = @entities.player.id
      switch result.method
        # Will only run once to give current
        # players and their positions
        when 'connectedPlayers'
          playerPositions = result.data.positions
          for dudeId, pos of playerPositions
            if dudeId != playerId
              # We're going to suppose right now that if
              # the dude doesn't have coords, he is still in the
              # initial spawn point.
              if pos.x == undefined and pos.y == undefined
                pos = new Coord(
                  @canvasWidth / 2,
                  @canvasheight / 2
                )
              # Create him on our canvas
              temp = new Player(
                that,
                pos,
                new Size(30, 30),
                'green'
              )
              temp.id = dudeId
              that.entities.dudes.push(temp)
        
        when 'numPlayers'
          l('number of players on server:' + result.data.numPlayers)
        
        when 'updatePlayer'
          # Update the dudes coords
          playerPositions = result.data.positions
          for dudeId, pos of playerPositions
            if dudeId != playerId
              for temp in that.entities.dudes
                if temp.id == dudeId
                  temp.position = pos
                  break
        
        else
          console.error('ERROR: Bad result method: ' + result.method)
          
      @socket.connect()
      
      # request for number of players
      request = new StandardRequest('numPlayers')
      @socket.send(request)