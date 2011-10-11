app = require('express').createServer()
io = require('socket.io').listen(app)

PORT = 3000

# Setup Express server
app.listen PORT

app.get '/', (req, res) ->
  res.send 'Squares'

# hash of connected players
players = {}

io.sockets.on 'connection', (socket) ->
  # Create the new player
  player = {
    id: parseInt(socket.id)
  }
  
  # Let everyone know about the player connecting
  socket.broadcast.emit 'player_connected', {
    player: player
  }
  
  # Add the new player to the array
  players[player.id] = player
  
  # EVENTS
  socket.on 'player_update', (req) ->
    # Update the player state hash
    players[req.id].position = req.position
    
    # Let all the clients know about the update
    socket.broadcast.emit 'players_sync', {
      method: 'player_sync',
      players: players
    }
  
  # Player has disconnected
  socket.on 'disconnect', ->
    # Remove them from the players array
    delete players[player.id]
    
    # Let all the clients know the player is gone
    socket.broadcast.emit 'player_disconnected', {
      method: 'player_disconnected',
      id: player.id
    }