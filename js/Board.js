var Board = (function() {
    // This is the init
    var Board = function(width, height) {
        this.matrix = [];
        
        if (width > height) {
            checker = width;
        } else {
            checker = height;
        }
        
        for (var i = 0; i < checker; i++) {
            this.matrix.push([]);
        }
        
        return true;
    }
    
    // These are public and avail in prototype
    Board.prototype.getMatrix = function() {
        return this.matrix;
    };
    
    Board.prototype.setOccupant = function(coord, occupant) {
        if (!coord instanceof Coord) {
            throw("object is not of object type Coord.");
        }
        this.matrix[coord.x][coord.y] = occupant;
        return true;
    };
    
    Board.prototype.getOccupant = function(coord) {
        checkCoordType(coord);
        return this.matrix[coord.x][coord.y];
    }
    
    return Board;
})();