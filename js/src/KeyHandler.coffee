# Handle keyboard input smoothly
class KeyHandler
  constructor: ->
    @pressed = {}
    
    # Numerical map of keyboard keys
    @KEYS = {
      W: 87,
      S: 83,
      A: 65,
      D: 68,
      SPACE: 32
    }
  
  isDown: (keyCode) ->
    @pressed[keyCode]
    
  onKeydown: (event) ->
    @pressed[event.keyCode] = true
    
  onKeyup: (event) ->
    delete @pressed[event.keyCode]