var Monster = Entity.extend({
    init: function(game, coord, size, color) {
        this._super(game, coord, size, color);
        this.mind.addState(new StateMonsterExploring(this));
        this.mind.addState(new StateMonsterStalled(this));
        this.mind.setState('exploring');
    },
    
    render: function() {
        var context = this.game.canvasBufferContext;
        context.fillStyle = this.color;
        context.shadowColor = '#ccc';
        context.shadowBlur = 2;
        context.shadowOffsetY = 2;
        context.shadowOffsetX = 2;
        context.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }
});