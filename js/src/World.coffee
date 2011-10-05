class World
  constructor: (@game, size) ->
    if !size?
      @size = new Size 5000, 5000
    else
      @size = size
    
  getRandomCoordInside: ->
    x = Helpers.generateRandomNumber(@size.width)
    y = Helpers.generateRandomNumber(@size.height)
    
    new Coord x, y
  
  _toStr: ->
    'W: ' + @size.width + ' - H: ' + @size.height