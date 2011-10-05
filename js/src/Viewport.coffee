# Purpose:
# Hold position of where we are in the world.
class Viewport
  constructor: (@game, coord) ->
    if !coord?
      @coord = new Coord 0, 0
    else
      @coord = coord
    
    # Store the last matrix generated
    @lastMatrix = null
    
    # Store the last matrix generated coords
    # for later cache checking on those coords
    @lastMatrixCoord = null
      
    # Right now the viewport can only be
    # the size of the canvas
    @size = new Size @game.canvasWidth, @game.canvasHeight
    
  move: (direction, velocity=1) ->
    switch direction
      when 'up'
        @coord.y -= velocity
      when 'down'
        @coord.y += velocity
      when 'left'
        @coord.x -= velocity
      when 'right'
        @coord.x += velocity
    this
    
  # Return the matrix of coords that the viewport
  # can curently "see". This will be used by the engine
  # to decide which entities to render.
  calcViewableCoordMatrix: ->
    # Return last matrix if coord hasn't changed
    if @coord.equalTo @lastMatrixCoord
      return @lastMatrix
    else  
      @lastMatrixCoord = @coord
   
    coords = []
    x = @coord.x
    while x <= @coord.x + @size.width
      y = @coord.y
      while y <= @coord.y + @size.height
        coords.push(new Coord x, y)
        y++
      x++
      
    @lastMatrix = coords
    # 
    # for(x = square.x; x < square.x + square.length; x++)
    #   for(y = square.y; y < square.y + square.height; y++)
    #     coords.append(new Coord(x,y)) 

  getViewableCoordMatrix: ->
    @calcViewableCoordMatrix() if @lastMatrix == null
    return @lastMatrix
