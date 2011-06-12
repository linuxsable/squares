class Vector
  constructor: (@x=0, @y=0) ->
  
  @fromPoints = (c1, c2) ->
    new Vector(c2.x - c1.x, c2.y - c1.y)