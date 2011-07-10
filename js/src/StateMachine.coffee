class StateMachine
  constructor: ->
    @states = {}
    @activeState = null
  
  addState: (state) ->
    @states[state.name] = state
    
  setState: (state) ->
    @activeState.exitActions() if @activeState?
    @activeState = @states[state]
    @activeState.entryActions()
    
  think: ->
    return if not @activeState?
    @activeState.doActions()
    stateName = @activeState.checkConditions()
    @setState stateName if stateName