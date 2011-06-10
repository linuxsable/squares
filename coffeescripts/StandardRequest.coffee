# Networking standard request
class StandardRequest
  constructor: (@method, data) ->
    @data = data or {}