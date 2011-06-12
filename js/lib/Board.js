(function() {
  var Board;
  Board = (function() {
    function Board(width, height) {
      var temp;
      this.width = width;
      this.height = height;
      this.matrix = [];
      temp = this.width;
      while (temp > 1) {
        this.matrix.push([]);
        temp--;
      }
    }
    Board.prototype.setOccupant = function(coord, occupant) {
      Helpers.checkCoordType(coord);
      this.matrix[coord.x][coord.y] = occupant;
      return true;
    };
    Board.prototype.removeOccupant = function(coord) {
      Helpers.checkCoordType(coord);
      delete this.matrix[coord.x][coord.y];
      return true;
    };
    Board.prototype.getOccupant = function(coord) {
      Helpers.checkCoordType(coord);
      return this.matrix[coord.x][coord.y];
    };
    return Board;
  })();
}).call(this);
