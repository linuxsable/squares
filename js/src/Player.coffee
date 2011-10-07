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