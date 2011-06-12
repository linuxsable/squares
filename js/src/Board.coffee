class Board
  constructor: (@width, @height) ->
    @matrix = []
    temp = @width
    # I belive this logic is right,
    # will need to be checked
    while temp > 1
      @matrix.push([])
      temp--
      
  setOccupant: (coord, occupant) ->
    Helpers.checkCoordType(coord)
    @matrix[coord.x][coord.y] = occupant
    return true
    
  removeOccupant: (coord) ->
    Helpers.checkCoordType(coord)
    delete @matrix[coord.x][coord.y]
    return true
  
  getOccupant: (coord) ->
    Helpers.checkCoordType(coord)
    return @matrix[coord.x][coord.y]