var StateMonsterExploring = Class.create(State, {
    _randomNumber: 0,
    
    initialize: function($super, monster) {
        if (!Helpers.checkType(monster, Monster)) {
            throw new TypeException('Param monster not of correct type');
        }
        this.monster = monster;
        this.monster.velocity = 1;
        $super('exploring');
    },
    
    doActions: function() {
        var movements = ['up', 'down', 'right', 'left'];
        var colors = ['pink', 'green', 'red', '#333', 'orange'];
        var randomNumber = Helpers.generateRandomNumber(100);
        var a = movements[randomNumber % 4];
        this.monster.move(a);
        
        if (this._randomNumber < 5) {
            this._randomNumber++;
            // this.monster.velocity++;
        }
        if (this._randomNumber == 4) {
            this._randomNumber = 0;
            // this.monster.color = colors[randomNumber % 6];
            // l(Object.toJSON(this.monster.bounds));
        }
        
        if (randomNumber % 30 == 1) {
            randomNumber = Helpers.generateRandomNumber(100);
            if (randomNumber % 3 == 1) {
                this.monster.decrementSize();
            } else {
                this.monster.incrementSize();
            }
        }
        
        if (this.monster.size.width > 40) {
            this.monster.size = new Size(20, 20);
        }
        
        // Hardcoded -- just testing
        if (this.monster.position.x > 1024 || this.monster.position.x < 0 || this.monster.position.y > 600 || this.monster.position.y < 0) {
            this.monster.position = new Coord(512, 300);
            this.monster.color = 'yellow';
            this.monster.velocity = 3;
            this.monster.size = new Size(10, 10);
        }
    },
    
    checkConditions: function() {
        if (this.monster.size.width > 21) {
            // return 'stalled';
        }
    },
    
    entryActions: function() {
        
    }
});