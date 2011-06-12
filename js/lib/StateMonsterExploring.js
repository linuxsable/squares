(function() {
  var StateMonsterExploring;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  StateMonsterExploring = (function() {
    StateMonsterExploring.monster = null;
    __extends(StateMonsterExploring, State);
    StateMonsterExploring.randomNumber = 0;
    StateMonsterExploring.direction = null;
    function StateMonsterExploring(monster) {
      this.monster = monster;
      this.monster.velocity = 1;
      StateMonsterExploring.__super__.constructor.call(this, 'exploring');
    }
    StateMonsterExploring.prototype.doActions = function() {
      var colors, movements, randomNumber;
      movements = ['up', 'down', 'right', 'left'];
      colors = ['pink', 'green', 'red', '#333', 'orange'];
      randomNumber = Helpers.generateRandomNumber(100);
      if (this.randomNumber > 30) {
        this.randomNumber = 0;
        this.direction = movements[randomNumber % 4];
      } else {
        this.randomNumber++;
      }
      this.monster.move(this.direction);
      if (this.monster.size.width > 40) {
        this.monster.size = new Size(20, 20);
      }
      if (this.monster.position.x > 1024 || this.monster.position.x < 0 || this.monster.position.y > 600 || this.monster.position.y < 0) {
        this.monster.position = new Coord(512, 300);
        this.monster.color = 'yellow';
        this.monster.velocity = 3;
        return this.monster.size = new Size(10, 10);
      }
    };
    StateMonsterExploring.prototype.checkConditions = function() {};
    StateMonsterExploring.prototype.entryActions = function() {};
    return StateMonsterExploring;
  })();
}).call(this);
