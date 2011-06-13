###
Coffee rewrite of: http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/index.html
###

if window.webkitRequestAnimationFrame
  onEachFrame = (cb) ->
    _cb = ->
      cb()
      webkitRequestAnimationFrame(_cb)
    _cb()
else if window.mozRequestAnimationFrame
  onEachFrame = (cb) ->
    _cb = ->
      cb()
      mozRequestAnimationFrame(_cb)
    _cb()
else
  onEachFrame = (cb) ->
    setInterval cb, 1000 / 60

window.onEachFrame = onEachFrame