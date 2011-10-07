class Entity
  constructor: (@game, coord, @size, @color) ->
    @position = coord
    @velocity = 2
    @destination = null
    @id = 0
    @mind = new StateMachine
    @keyHandler = new KeyHandler
    
  # prototype
  destroy: ->
    
  # prototype
  render: ->
    
  # Prototype
  isViewable: ->
    
  initControlEvents: ->
    $(document).bind 'keydown', (e) =>
      @keyHandler.onKeydown(e)
    $(document).bind 'keyup', (e) =>
      @keyHandler.onKeyup(e)
  
  update: ->
    @mind.think()
    
  # Set velocity to default to the entities
  # velocity. Otherwise we can set our own
  # if we want to make a movement further.
  move: (direction, velocity = @velocity) ->
    switch direction
      when 'up'
        @position.y -= velocity
      when 'down'
        @position.y += velocity
      when 'left'
        @position.x -= velocity
      when 'right'
        @position.x += velocity
    this
  
  # for fun ;p
  teleport: ->
    @position = Coord.getRandomInsideCanvas(@game)
    this
    
  randomDestination: ->
    @destination = Coord.getRandomInsideCanvas(@game)
    this
  
  incrementSize: (sensitivity = 5) ->
    @size.width += sensitivity
    @size.height += sensitivity
    this
    
  decrementSize: (sensitivity = 5) ->
    @size.width -= sensitivity
    @size.height -= sensitivity
    this