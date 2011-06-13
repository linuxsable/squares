class Monster extends Entity
  constructor: (game, coord, size, color) ->
    super(game, coord, size, color)
    @mind.addState(new StateMonsterExploring(this))
    @mind.addState(new StateMonsterStalled(this))
    @mind.setState('exploring')
    
  render: ->
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