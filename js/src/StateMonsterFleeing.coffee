# This state is going to be what the monster
# turns on if the player gets near him. It shouldn't
# allow the player to touch the monster because he flees away
class StateMonsterFleeing extends State
  constructor: (@monster) ->
    super('fleeing')
    @num = 0
    
  doActions: ->
    movements = ['up', 'down', 'right', 'left']
    
    randomNumber = Helpers.generateRandomNumber(100)
    thing = randomNumber % 4
    direction = movements[thing]
    
    @monster.move(direction)

  checkConditions: ->
    # Check to see if we're far enough away
    # then exit out back to exploring
    player = @monster.game.getPlayer()
    n = 50
    
    if (player.position.x >= (@monster.position.x + n) or player.position.x <= (@monster.position.x - n)) or (player.position.y >= (@monster.position.y + n) or player.position.y <= (@monster.position.y - n))
      return 'exploring'
    
  entryActions: ->
    @monster.velocity = 2
    @monster.color = 'red'