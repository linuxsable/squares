class Coord
  constructor: (@x, @y) ->
  
  # This should work
  @getRandomInsideCanvas: (game) ->
    return new Coord(
      Helpers.generateRandomNumber(game.canvasWidth),
      Helpers.generateRandomNumber(game.canvasHeight)
    )