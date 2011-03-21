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
        var a = movements[+Date.now() % 4];
        this.monster.move(a);
        
        if (+Date.now() % 10 == 1) {
            if (+Date.now() % 2 == 0) {
                this.monster.incrementSize();
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