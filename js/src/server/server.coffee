# Libs
http = require 'http'
io = require 'socket.io'
_ = require 'underscore'
StandardResult = require '../StandardResult'

# Config
CONFIG = {
  port: 8000
}

# Start node http server
server = http.createServer (req, res) ->
  # Right here we can use this to have an html
  # interface to the server with game stats, etc.
  # Would be cool, yeah?
  res.writeHead 200, 'Content-Type': 'text/html'
  res.write 'Game Server'
  res.end()

server.listen CONFIG.port

# Start socket server
socket = io.listen server
playerPostions = {}

socket.on 'connection', (client) ->
  playerPostions[client.sessionId] = {}
  
  result = new StandardResult 'connectedPlayers',
    positions: playerPostions
  
  client.send result
  
  client.on 'disconnect', ->
    delete playerPostions[client.sessionId]
    
  client.on 'message', (req) ->
    result = new StandardResult request.method
    
    console.log "REQUEST: #{request.method}"
    
    switch request.method
      when 'numPlayers'
        result.data = {
          numPlayers: _.size socket.clients
        }
        client.send result
      when 'updatePlayer'
        id = request.data.id
        playerPostions[id] = request.data.position
        result.data = {
          positions: playerPositions
        }
        socket.broadcast result
        console.log playerPositions
      else
        console.log "ERROR: Bad request method #{request.method}"