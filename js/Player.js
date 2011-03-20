var Player = Class.create(Entity, {
    render: function() {
        var context = this.game.canvasBufferContext;
        context.fillStyle = this.color;
        context.shadowColor = '#ccc';
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