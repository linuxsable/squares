class Player extends Entity 
  render: ->
    super()
    context = @game.canvasBufferContext
    context.fillStyle = @color
    context.shadowColor = '#333'
    context.shadowBlur = 2
    context.shadowOffsetY = 2
    context.shadowOffsetX = 2
    context.fillRect(
      @position.x,
      @position.y,
      @size.width,
      @size.height
    )
    
  update: ->
    k = @keyHandler
    @move('up') if k.isDown(k.KEYS.W)
    @move('down') if k.isDown(k.KEYS.S)
    @move('left') if k.isDown(k.KEYS.A)
    @move('right') if k.isDown(k.KEYS.D)