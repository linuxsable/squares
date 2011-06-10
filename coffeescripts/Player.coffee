class Player extends Entity
  render: ->
    context = @game.canvasBufferContext
    context.fillStyle = @color
    context.shadowColor = '#ccc'
    context.shadowBlur = 2
    context.shadowOffsetY = 2
    context.shadowOffsetX = 2
    context.fillRect(
      @position.x,
      @position.y,
      @size.width,
      @size.height
    )
    
  move: (direction) ->
    super(direction)
    _sendToServer()
    
  update: ->
    k = @keyHandler
    @move('up') if k.isDown(k.UP)
    @move('down') if k.isDown(k.DOWN)
    @move('left') if k.isDown(k.LEFT)
    @move('right') if k.isDown(k.RIGHT)
    @mind.think()
  
  _sendToServer: ->
    request = new StandardRequest 'updatePlayer', {
      id: @id,
      position: @position
    }
    @game.socket.send(request)