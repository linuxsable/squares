var http = require('http'),
    io = require('socket.io'),
    _ = require('underscore'),
    // This looks horrible & can't be right, but it works
    StandardResult = require('./StandardResult');
    
server = http.createServer(function(req, res) {
    // Right here we can use this to have an html
    // interface to the server with game stats, etc.
    // Would be cool, yeah?
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('game server'); 
});
server.listen(8080);

// socket.io 
var socket = io.listen(server);
var playerPositions = {};
    
socket.on('connection', function(client) {    
    playerPositions[client.sessionId] = {};
    var result = new StandardResult('connectedPlayers', {
        positions: playerPositions
    });
    client.send(result);
    
    console.log(result);
    
    client.on('disconnect', function() {
        delete playerPositions[client.sessionId];
    });
    
    client.on('message', function(request) {
        var result = new StandardResult(request.method);
        
        console.log('REQUEST: ' + request.method);
        
        switch (request.method) {
            case 'numPlayers':
                result.data = {
                    numPlayers: _.size(socket.clients)
                };
                client.send(result);
                break;

            case 'updatePlayer':
                var id = request.data.id;
                playerPositions[id] = request.data.position;
                result.data = {
                    positions: playerPositions
                };
                socket.broadcast(result);
                console.log(playerPositions);
                break;
                
            default:
                console.log('ERROR: Bad request method ' + request.method);
        }
    });
});