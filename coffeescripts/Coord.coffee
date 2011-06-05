class Coord
  constructor: (@x, @y) ->
    return
  
  # This should work
  @getRandomInsideCanvas: (game) ->
    return new coord(
      Helpers.generateRandomNumber(game.canvasWidth),
      Helpers.generateRandomNumber(game.canvasHeight)
    )