var Monster = Class.create(Entity, {
    initialize: function($super, game, coord, size, color) {
        $super(game, coord, size, color);
        var exploringState = new StateMonsterExploring(this);
        this.mind.addState(exploringState);
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