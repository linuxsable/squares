var Grid = (function() {
    function Grid(size, color) {
        Helpers.checkSizeType(size);
        
        this.width = size.width;
        this.height = size.height;
        this.color = color;
        this.matrix = [];
        
        for (var i = 0; i < this.width; i++) {
            this.matrix.push([]);
            for (var x = 0; x < this.height; x++) {
                this.matrix[i][x] = [];
            };
        };
    }
    
    Grid.prototype.render = function(context) {

    };
    
    Grid.prototype.update = function() {
        
    };
    
    Grid.prototype.move = function(direction) {
        
    };
    
    Grid.prototype.destroy = function() {

    };

    return Grid;
})();