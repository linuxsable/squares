class StateMonsterStalled extends State
  @monster = null
  @rendered = false
  
  constructor: (@monster) ->
    super('stalled')
    
  doActions: ->
    if @rendered
      @monster.incrementSize().incrementSize()
      @rendered = false
    else
      @monster.decrementSize().decrementSize()
      @rendered = true
      
  checkConditions: ->
    
  entryActions: ->
    @monster.color = 'yellow'