# Purpose:
# Hold position of where we are in the world.
class Viewport
  constructor: (@game, coord) ->
    if !coord?
      @coord = new Coord 0, 0
    else
      @coord = coord
      
    # Size should be the size of the canvas
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
    this