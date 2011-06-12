class StateMonsterExploring extends State
  @monster = null
  @randomNumber = 0
  @direction = null
  
  constructor: (@monster) ->
    @monster.velocity = 1
    super('exploring')
    
  doActions: ->
    movements = ['up', 'down', 'right', 'left']
    colors = ['pink', 'green', 'red', '#333', 'orange']
    randomNumber = Helpers.generateRandomNumber(100)
    
    if @randomNumber > 30
      @randomNumber = 0
      @direction = movements[randomNumber % 4]
    else
      @randomNumber++
    
    @monster.move(@direction)
    
    if @monster.size.width > 40
      @monster.size = new Size(20, 20)
    
    # Hardcoded - just testing
    if @monster.position.x > 1024 or @monster.position.x < 0 or @monster.position.y > 600 or @monster.position.y < 0
      @monster.position = new Coord(512, 300)
      @monster.color = 'yellow'
      @monster.velocity = 3
      @monster.size = new Size(10, 10)
      
  checkConditions: ->
    if @monster.size.width > 21
      # return 'stalled'
      
  entryActions: ->