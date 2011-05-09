module.exports.StandardResult = (method, data) ->
  @error = false
  @method = method
  @data = data or {}
  @meta = {}
  return