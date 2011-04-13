var StateMonsterStalled = Class.create(State, {
    rendered: false,
    
    initialize: function($super, monster) {
        if (!Helpers.checkType(monster, Monster)) {
            throw new TypeException('Param monster not of correct type');
        }
        this.monster = monster;
        $super('stalled');
    },
    
    doActions: function() {
        if (this.rendered) {
            this.monster.incrementSize();
            this.monster.incrementSize();
            this.rendered = false;
        } else {
            this.monster.decrementSize();
            this.monster.decrementSize();
            this.rendered = true;
        }
    },
    
    checkConditions: function() {
        
    },
    
    entryActions: function() {
        this.monster.color = 'yellow';
    }
});