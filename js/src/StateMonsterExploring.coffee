class StateMonsterExploring extends State
  constructor: (@monster) ->
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
    # player = @monster.game.getPlayer()
    # n = 50
    # 
    # if (player.position.x <= (@monster.position.x + n) and player.position.x >= (@monster.position.x - n)) and (player.position.y <= (@monster.position.y + n) and player.position.y >= (@monster.position.y - n))
    #   return 'fleeing'
      
  entryActions: ->
    @monster.velocity = 1
    @monster.color = '#333'