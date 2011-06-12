class Entity
  constructor: (@game, @coord, @size, @color) ->
    @position = @coord
    @velocity = 2
    @destination = null
    @mind = new StateMachine
    @id = 0
    @keyHandler = new KeyHandler
    
  # prototype
  destroy: ->
    
  # prototype
  render: ->
    
  update: ->
    @mind.think()
    
  move: (direction) ->
    switch direction
      when 'up'
        @position.y -= @velocity
      when 'down'
        @position.y += @velocity
      when 'left'
        @position.x -= @velocity
      when 'right'
        @position.x += @velocity
    return this
  
  # for fun ;p
  teleport: ->
    @position = Coord.getRandomInsideCanvas(@game)
    return this
    
  randomDestination: ->
    @destination = Coord.getRandomInsideCanvas(@game)
    return this
  
  incrementSize: (sensitivity) ->
    sensitivity = sensitivity || 5
    @size.width += sensitivity
    @size.height += sensitivity
    return this
    
  decrementSize: (sensitivity) ->
    sensitivity = sensitivity || 5
    @size.width -= sensitivity
    @size.height -= sensitivity
    return this