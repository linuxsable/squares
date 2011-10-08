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
    viewportPos = @game.viewport.position
    switch direction
      when 'up'
        @position.y -= velocity
        if (@game.viewport.position.y + (@game.viewport.size.height * .15)) >= @position.y
          @game.viewport.move('up', velocity)
      when 'down'
        @position.y += velocity
        if (@game.viewport.position.y + (@game.viewport.size.height * .85)) <= @position.y
          @game.viewport.move('down', velocity)
      when 'left'
        @position.x -= velocity
        if (@game.viewport.position.x + (@game.viewport.size.width * .15)) >= @position.x
          @game.viewport.move('left', velocity)
      when 'right'
        @position.x += velocity
        if (@game.viewport.position.x + (@game.viewport.size.width * .85)) <= @position.x
          @game.viewport.move('right', velocity)
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