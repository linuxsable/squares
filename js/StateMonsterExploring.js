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
        
        if (randomNumber % 30 == 1) {
            randomNumber = (+Date.now() + Helpers.generateRandomNumber(100));
            if (randomNumber % 3 == 1) {
                this.monster.decrementSize();
            } else {
                this.monster.incrementSize();
            }
        }
    },
    
    checkConditions: function() {
        if (this.monster.size.width > 21) {
            return 'stalled';
        }
    },
    
    entryActions: function() {
        
    }
});
