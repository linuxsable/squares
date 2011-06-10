# Networking standard result
module.exports.StandardResult = (@method, data) ->
  @data = data or {}
  @error = false
  @meta = {}
  return