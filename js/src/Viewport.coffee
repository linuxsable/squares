# Purpose:
# Hold position of where we are in the world.
class Viewport
  constructor: (@game, position) ->
    # Right now the viewport can only be
    # the size of the canvas
    @size = new Size @game.canvasWidth, @game.canvasHeight
    @keyHandler = new KeyHandler
    @padding = 100
    
    if !position?
      @position = new Coord 0, 0
    else
      @position = position
    
  move: (direction, velocity=4) ->
    # This clones the position coord for later
    oldPosition = $.extend true, {}, @position
    
    switch direction
      when 'up'
        @position.y -= velocity
      when 'down'
        @position.y += velocity
      when 'left'
        @position.x -= velocity
      when 'right'
        @position.x += velocity
        
    # Reset the position if they're "out of world bounds"
    # We don't want the viewport to go wandering
    if @position.x > (@game.world.size.width - @size.width) || @position.x < 0 || @position.y > (@game.world.size.height - @size.height) || @position.y < 0
      @position = oldPosition
        
    # console.log 'X: ' + @position.x + ' Y: ' + @position.y
    this

  # This is used to move the viewport around
  update: ->
    k = @keyHandler
    @move('up') if k.isDown(k.KEYS.UP)
    @move('down') if k.isDown(k.KEYS.DOWN)
    @move('left') if k.isDown(k.KEYS.LEFT)
    @move('right') if k.isDown(k.KEYS.RIGHT)
    
    @centerOverPlayer() if k.isDown(k.KEYS.SPACE)
  
  centerOverPlayer: ->
    temp = $.extend true, {}, @game.getPlayer().position
    temp.x -= @size.width / 2
    temp.y -= @size.height / 2
    
    if temp.x > (@game.world.size.width - @size.width) || temp.x < 0 || temp.y > (@game.world.size.height - @size.height) || temp.y < 0
      return
    else
      @position = temp

  initControlEvents: ->
    $(document).bind 'keydown', (e) =>
      @keyHandler.onKeydown(e)
    $(document).bind 'keyup', (e) =>
      @keyHandler.onKeyup(e)