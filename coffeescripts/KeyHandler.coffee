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
    return @pressed.keyCode
    
  onKeydown: (event) ->
    key = event.keyCode
    @pressed.key = true
    
  onKeyup: (event) ->
    key = event.keyCode
    delete @pressed.key