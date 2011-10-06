class Monster extends Entity
  constructor: (game, coord, size, color) ->
    super(game, coord, size, color)
    @mind.addState(new StateMonsterExploring(this))
    @mind.addState(new StateMonsterFleeing(this))
    @mind.setState('exploring')
    
  render: ->
    super()
    
    # Don't render if we don't need to
    return if !@isViewable()
    
    context = @game.canvasBufferContext
    context.fillStyle = @color
    context.shadowColor = '#333'
    context.shadowBlur = 4
    context.shadowOffsetY = 2
    context.shadowOffsetX = 2
    context.fillRect(
      @position.x - @game.viewport.position.x,
      @position.y - @game.viewport.position.y,
      @size.width,
      @size.height
    )
  
  # This detects if the monster is in the viewport
  # ie, should it be displayed
  isViewable: ->
    if @position.x > @game.viewport.position.x && @position.y > @game.viewport.position.y && @position.x < @game.viewport.position.x + @game.viewport.size.width && @position.y < @game.viewport.position.y + @game.viewport.size.height
      return true
    return false