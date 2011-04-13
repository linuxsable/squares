var http = require('http'),
    io = require('socket.io'),
    StandardResult = require('./StandardResult');
    
var PORT = 8080;

server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.end('<h1>Hello world</h1>'); 
});
server.listen(PORT);

// socket.io 
var socket = io.listen(server);
var connections = 0;
socket.on('connection', function(client) {
    connections++;
    console.log('client connected');
    
    client.on('message', function(m) {
        var r = new result();
        switch (m.method) {
            case 'num_players':
                console.log('num_players request');
                r.message = connections;
                r.error = false;
                r.method = 'num_players';
                client.send(r);
                break;
                
            case 'im':
                console.log('im request');
                r.message = m.message;
                r.error = false;
                r.method = 'im';
                client.broadcast(r);
                break;
            
            case 'update_player':
                console.log('update_player request');
                console.log(m);
                r.error = false;
                r.method = 'update_player';
                client.broadcast(r);
                break;
        }
    });
    
    client.on('disconnect', function() {
        connections--;
    });
});