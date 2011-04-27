var Helpers = {    
    checkType: function(obj, type) {
        if (false === (obj instanceof type)) {
            return false;
        }
        return true;
    },
    
    isFunction: function(obj, type) {
        return checkType(obj, type);
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
};

// Logging
var l = function(v) {
    if (!console || !console.log) {
        return;
    }
    console.log(v);
};