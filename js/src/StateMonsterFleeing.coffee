# This state is going to be what the monster
# turns on if the player gets near him. It shouldn't
# allow the player to touch the monster because he flees away
class StateMonsterExploring extends State
  constructor: (@monster) ->
    @monster.velocity = 1
    super('fleeing')
    @num = 0
    
  doActions: ->

  checkConditions: ->
    # Check to see if we're far enough away
    # then exit out back to exploring
    'exploring'
    
  entryActions: ->
    movements = ['up', 'down', 'right', 'left']
    colors = ['red', '#fff']
    
    randomNumber = Helpers.generateRandomNumber(100)
    thing = randomNumber % 4
    direction = movements[thing]
        
    @monster.move(direction, 3)
    @monster.color = 'red'