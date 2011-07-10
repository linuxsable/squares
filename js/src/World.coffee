class World
  constructor: (@game, @width=2000, @height=2000) ->
    @mind = new StateMachine
    @entities = {}
  
  getWidth: ->
    @width
  
  getHeight: ->
    @height
    
  update: ->
    @mind.think()
    
  render: ->
     