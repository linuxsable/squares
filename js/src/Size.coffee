class Size
  constructor: (@width, @height) ->
  
  # Compare two Size objects for equalness
  equalTo: (size) ->
    return false if !(size instanceof Size)
    return false if size.width != @width
    return false if size.height != @height
    return true