var Board = (function() {
    // Private instance vars

    // Constructor
    var Board = function(width, height) {
        this.matrix = [];
        for (var i = 0; i < width; i++) {
            this.matrix.push([]);
        }
    }
    
    // Public methods
    Board.prototype.debug = function() {
        debugger;
    };

    Board.prototype.setOccupant = function(coord, occupant) {
        Helpers.checkCoordType(coord);
        this.matrix[coord.x][coord.y] = occupant;
        return true;
    };
    
    Board.prototype.getOccupant = function(coord) {
        Helpers.checkCoordType(coord);
        return this.matrix[coord.x][coord.y];
    }
    
    return Board;
})();