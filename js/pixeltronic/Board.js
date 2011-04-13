var Board = Class.create({    
    initialize: function(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = [];
        for (var i = 0; i < this.width; i++) {
            this.matrix.push([]);
        }
    },
    
    setOccupant: function(coord, occupant) {
        Helpers.checkCoordType(coord);
        this.matrix[coord.x][coord.y] = occupant;
        return true;
    },
    
    removeOccupant: function(coord) {
        Helpers.checkCoordType(coord);
        delete this.matrix[coord.x][coord.y];
        return true;
    },
    
    getOccupant: function(coord) {
        Helpers.checkCoordType(coord);
        return this.matrix[coord.x][coord.y];
    }
});