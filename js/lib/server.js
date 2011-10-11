var PORT, app, io, players;
app = require('express').createServer();
io = require('socket.io').listen(app);
PORT = 3000;
app.listen(PORT);
app.get('/', function(req, res) {
  return res.send('Squares');
});
players = {};
io.sockets.on('connection', function(socket) {
  var player;
  player = {
    id: parseInt(socket.id)
  };
  socket.broadcast.emit('player_connected', {
    player: player
  });
  players[player.id] = player;
  socket.on('player_update', function(req) {
    players[req.id].position = req.position;
    return socket.broadcast.emit('players_sync', {
      method: 'player_sync',
      players: players
    });
  });
  return socket.on('disconnect', function() {
    delete players[player.id];
    return socket.broadcast.emit('player_disconnected', {
      method: 'player_disconnected',
      id: player.id
    });
  });
});