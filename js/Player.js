var Player = Class.create(Entity, {
    render: function(context) {
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
    },
    
    move: function(direction) {
        switch (direction) {
            case 'up':
                this.position.y = this.position.y - this.velocity;
                break;
            case 'down':
                this.position.y = this.position.y + this.velocity;
                break;
            case 'left':
                this.position.x = this.position.x - this.velocity;
                break;
            case 'right':
                this.position.x = this.position.x + this.velocity;
                break;
        }
    }
});