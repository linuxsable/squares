class StateMonsterExploring extends State
  constructor: (@monster) ->
    @monster.velocity = 0.2
    super('exploring')
    
  doActions: ->
    movements = ['up', 'down', 'right', 'left']
    colors = ['pink', 'green', 'red', '#333', 'orange']
    
    randomNumber = Helpers.generateRandomNumber(100)
    direction = movements[randomNumber % 4]
    
    # TODO: Before we move check to make sure that the move isn't going
    # to put the monster outside the canvas walls    
    @monster.move(direction)

  checkConditions: ->
      
  entryActions: ->