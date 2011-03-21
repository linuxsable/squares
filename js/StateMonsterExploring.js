var StateMonsterExploring = Class.create(State, {
    initialize: function($super, monster) {
        if (!Helpers.checkType(monster, Monster)) {
            throw new TypeException('Param monster not of correct type');
        }
        this.monster = monster;
        $super('exploring');
    },
    
    doActions: function() {
        var movements = ['up', 'down', 'right', 'left'];
        var randomNumber = (+Date.now() + Helpers.generateRandomNumber(100));
        var a = movements[randomNumber % 4];
        this.monster.move(a);
        
        if (randomNumber % 10 == 1) {
            if (randomNumber % 2 == 0) {
                this.monster.incrementSize().teleport();
            } else {
                this.monster.decrementSize();
            }
        }
    },
    
    checkConditions: function() {
        
    },
    
    entryActions: function() {
        
    }
});