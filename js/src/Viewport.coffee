# Purpose:
# Hold position of where we are in the world.
class Viewport
  constructor: (@game, position) ->
    if !position?
      @position = new Coord 0, 0
    else
      @position = position
      
    # Right now the viewport can only be
    # the size of the canvas
    @size = new Size @game.canvasWidth, @game.canvasHeight
    
  move: (direction, velocity=1) ->
    switch direction
      when 'up'
        @position.y -= velocity
      when 'down'
        @position.y += velocity
      when 'left'
        @position.x -= velocity
      when 'right'
        @position.x += velocity
        
    console.log 'X: ' + @position.x + ' Y: ' + @position.y
    this