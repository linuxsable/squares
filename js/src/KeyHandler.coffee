# Handle keyboard input smoothly
class KeyHandler
  constructor: ->
    @pressed = {}
    @UP = 87
    @DOWN = 83
    @RIGHT = 68
    @LEFT = 65
    @SPACE = 32
  
  isDown: (keyCode) ->
    @pressed[keyCode]
    
  onKeydown: (event) ->
    @pressed[event.keyCode] = true
    
  onKeyup: (event) ->
    delete @pressed[event.keyCode]