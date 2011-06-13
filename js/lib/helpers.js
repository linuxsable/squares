var Helpers, l;
Helpers = {
  generateRandomNumber: function(maxLength) {
    return Math.floor(Math.random() * ++maxLength);
  }
};
l = function(v) {
  if (!console && !console.log) {
    return;
  }
  return console.log(v);
};