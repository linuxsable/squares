class Game
  constructor: ->
    @canvas = null
    @canvasWidth = 1024
    @canvasHeight = 600
    @canvasContext = null
    @canvasBuffer = null
    @canvasBufferContext = null
    @fps = 60
    
    @server = {
      HOST: 'http://localhost',
      PORT: 3000
    }
    
    @socket = null
    
    @entities = {
      # User player
      player: null,
      # Other players
      players: {},
      monsters: []
    }
    
    @world = null
    @viewport = null
    
    # Do init setups
    @initCanvas()
    @initWorld()
    @initViewport()
    @initPlayer()
    # @initMonsters()
    @initControlEvents()
    
    # Networking
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
      
    false
    
  initControlEvents: ->
    @entities.player.initControlEvents()
    @viewport.initControlEvents()
  
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
  
  # This runs right before the frame
  # gets written to the buffer
  initFrame: ->
    @updateEntities()
    @viewport.update()
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
      # This should probably be refactored
      if key == 'players'
        $.each entity, (k, v) ->
          v.render()
          
      else if $.isArray entity
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
      # This should probably be refactored
      if key == 'players'
        $.each entity, (k, v) ->
          v.update()
      
      else if $.isArray entity
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
      @entities.player.velocity = 5
      
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
    
  initSocket: ->
    if @socket != null
      throw 'Already connected to server'
      
    @socket = io.connect @server.HOST, {port: @server.PORT}
    
    _entities = @entities
    _socket = @socket
    _self = @
    
    # When you've connected to server
    @socket.on 'connect', ->
      $('#chat').prepend '<div>Connected to server.</div>'
      
      # Save the sessionid on the player object
      _entities.player.id = parseInt(_socket.socket.sessionid)
      
      # Tell the server where the player is on init
      _socket.emit 'player_update', {
        id: _entities.player.id,
        position: _entities.player.position
      }
      
      # Init all current players
      _socket.on 'players_sync', (req) ->
        $.each req.players, (k, v) ->
          id = parseInt(v.id)
          
          if id != _entities.player.id
            
            # Does the player already exist?
            if _entities.players.hasOwnProperty(id)
              _entities.players[id].position = new Coord(v.position.x, v.position.y)
              
            # Create player newly
            else
              _entities.players[id] = new Player(
                _self,
                new Coord(v.position.x, v.position.y),
                new Size(30, 30),
                '#fff',
                parseInt(v.id)
              )
        
      # Let the chat know about a player connecting
      _socket.on 'player_connected', (req) =>
        $('#chat').prepend '<div>Player connected #'+req.player.id+'</div>'
      
      # Let the chat know, remove the player from the entities
      _socket.on 'player_disconnected', (req) ->
        $('#chat').prepend '<div>Player disconnected #'+req.id+'</div>'
        delete _entities.players[req.id]
        