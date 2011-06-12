(function() {
  var CONFIG, StandardResult, http, io, playerPostions, server, socket, _;
  http = require('http');
  io = require('socket.io');
  _ = require('underscore');
  StandardResult = require('../StandardResult');
  CONFIG = {
    port: 8000
  };
  server = http.createServer(function(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write('Game Server');
    return res.end();
  });
  server.listen(CONFIG.port);
  socket = io.listen(server);
  playerPostions = {};
  socket.on('connection', function(client) {
    var result;
    playerPostions[client.sessionId] = {};
    result = new StandardResult('connectedPlayers', {
      positions: playerPostions
    });
    client.send(result);
    client.on('disconnect', function() {
      return delete playerPostions[client.sessionId];
    });
    return client.on('message', function(req) {
      var id;
      result = new StandardResult(request.method);
      console.log("REQUEST: " + request.method);
      switch (request.method) {
        case 'numPlayers':
          result.data = {
            numPlayers: _.size(socket.clients)
          };
          return client.send(result);
        case 'updatePlayer':
          id = request.data.id;
          playerPostions[id] = request.data.position;
          result.data = {
            positions: playerPositions
          };
          socket.broadcast(result);
          return console.log(playerPositions);
        default:
          return console.log("ERROR: Bad request method " + request.method);
      }
    });
  });
}).call(this);
