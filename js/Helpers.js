var Helpers = {
        checkCoordType: function(obj) {
            if (false === (obj instanceof Coord)) {
                throw('Object not of Coord type');
            }
        },
        
        checkSizeType: function(obj) {
            if (false === (obj instanceof Size)) {
                throw('Object not of Size type');
            }
        },
        
        // Generate a random number. Max length is the largest
        // value the random number will go to. This generator
        // includes 0 in the range.
        generateRandomNumber: function(maxLength) {
            return Math.floor(Math.random() * ++maxLength);
        },
        
        getUniqueId: (function() {
    		var unique = 0;
    		return function() {
    			return ++unique;
    		};
    	})()
    }
};
