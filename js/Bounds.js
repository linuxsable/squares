var Bounds = Class.create({
    initialize: function(coord, size) {
        this.top = coord.y;
        this.right = coord.x + size.width;
        this.bottom = coord.y + size.height;
        this.left = coord.x;
    }
});