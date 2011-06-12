class Coord
  constructor: (@x, @y) ->
  
  # This should work
  @getRandomInsideCanvas: (game) ->
    return new coord(
      Helpers.generateRandomNumber(game.canvasWidth),
      Helpers.generateRandomNumber(game.canvasHeight)
    )