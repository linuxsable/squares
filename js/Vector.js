var Vector = Class.create({
    initialize: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    },
});

// Class methods
Vector.fromPoints = function(c1, c2) {
    return new Vector(c2.x - c1.x, c2.y - c1.y);
};