var http = require('http'),
    io = require('socket.io'),
    // This looks horrible & can't be right
    StandardResult = require('./StandardResult').StandardResult;
    
server = http.createServer(function(req, res) {
    // Right here we can use this to have an html
    // interface to the server with game stats, etc.
    // Would be cool, yeah?
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('game server'); 
});
server.listen(8080);

// socket.io 
var socket = io.listen(server),
    connections = 0;
    
socket.on('connection', function(client) {
    connections++;
    
    client.on('disconnect', function() {
        connections--;
    });
    
    client.on('message', function(request) {
        var result = new StandardResult();
        result.method = request.method;
        
        console.log(request.method + ' request');
        
        switch (request.method) {
            case 'num_players':
                result.data = {
                    'num_clients': connections
                };
                client.send(result);
                break;

            case 'update_player':
                console.log(request.data.position);
                result.data = request.data;
                result.data.player_id = client.sessionId;
                socket.broadcast(result);
                break;
                
            default:
                console.log('ERROR - Bad request method ' + request.method);
        }
    });
});