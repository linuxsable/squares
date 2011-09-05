class StateMachine
  constructor: ->
    @states = {}
    @activeState = null
  
  # Ad in available states
  addState: (state) ->
    @states[state.name] = state
  
  # Set the activeState to a new one. This fires
  # off the exit actions for the previous state.
  setState: (state) ->
    @activeState.exitActions() if @activeState?
    @activeState = @states[state]
    @activeState.entryActions()
    
  # Run the logic for the state. Then check the conditions
  # to make sure the state is still true, else put it in a
  # new state.
  think: ->
    return if not @activeState?
    @activeState.doActions()
    stateName = @activeState.checkConditions()
    @setState stateName if stateName