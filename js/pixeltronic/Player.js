var Player = Class.create(Entity, {
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
    },
    
    update: function() {
        var k = this.keyHandler;
        if (k.isDown(k.UP)) {
            this.move('up');
        }
        if (k.isDown(k.DOWN)) {
            this.move('down');
        }
        if (k.isDown(k.LEFT)) {
            this.move('left');
        }
        if (k.isDown(k.RIGHT)) {
            this.move('right');
        }
        this.mind.think();
    }
});