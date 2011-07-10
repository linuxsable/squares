# Purpose:
# Hold position of where we are on the map
class Viewport
  constructor: (@position) ->
    
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