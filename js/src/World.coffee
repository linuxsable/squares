# The world is basically a giant matrix. It sends the size
# of the map and world and everything in it. The viewport
# can not extend out further than the world.
class World
  constructor: (@game, size) ->
    if !size?
      @size = new Size 1000, 1000
    else
      @size = size
    
  getRandomCoordInside: ->
    x = Helpers.generateRandomNumber(@size.width)
    y = Helpers.generateRandomNumber(@size.height)
    
    new Coord x, y
  
  _toStr: ->
    'W: ' + @size.width + ' - H: ' + @size.height