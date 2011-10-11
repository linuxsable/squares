class Player extends Entity 
  render: ->
    super()
    
    return if !@isViewable()
    
    context = @game.canvasBufferContext
    context.fillStyle = @color
    context.shadowColor = '#333'
    context.shadowBlur = 2
    context.shadowOffsetY = 2
    context.shadowOffsetX = 2
    context.fillRect(
      @position.x - @game.viewport.position.x,
      @position.y - @game.viewport.position.y,
      @size.width,
      @size.height
    )
    
  move: (direction, velocity = @velocity) ->
    # This clones the position coord for later
    oldPosition = $.extend true, {}, @position
    
    padding = @game.viewport.padding
    
    switch direction
      when 'up'
        @position.y -= velocity
        if (@game.viewport.position.y + padding / 2) >= @position.y
          @game.viewport.move('up', velocity)
          
      when 'down'
        @position.y += velocity
        if (@game.viewport.position.y + @game.viewport.size.height - padding) <= @position.y
          @game.viewport.move('down', velocity)
          
      when 'left'
        @position.x -= velocity
        if (@game.viewport.position.x + padding) >= @position.x
          @game.viewport.move('left', velocity)
          
      when 'right'
        @position.x += velocity
        if (@game.viewport.position.x + @game.viewport.size.width - padding) <= @position.x
          @game.viewport.move('right', velocity)
          
    if @position.x > (@game.world.size.width - @size.width) || @position.x <= 0 || @position.y > (@game.world.size.height - @size.height) || @position.y <= 0
      @position = oldPosition
      
    # Tell the server
    @game.socket.emit 'player_update', {
      id: @id,
      position: @position
    }
    
    this
    
  update: ->
    k = @keyHandler
    @move('up') if k.isDown(k.KEYS.W)
    @move('down') if k.isDown(k.KEYS.S)
    @move('left') if k.isDown(k.KEYS.A)
    @move('right') if k.isDown(k.KEYS.D)
  
  isViewable: ->
    if @position.x > @game.viewport.position.x && @position.y > @game.viewport.position.y && @position.x < @game.viewport.position.x + @game.viewport.size.width && @position.y < @game.viewport.position.y + @game.viewport.size.height
      return true
    return false