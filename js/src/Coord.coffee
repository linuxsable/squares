class Coord  
  constructor: (@x, @y) ->
    
  # Compare two Coord objects for equalness
  equalTo: (coord) ->
    return false if !(coord instanceof Coord)
    return false if coord.x != @x
    return false if coord.y != @y
    return true