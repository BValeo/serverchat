var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


users = [];
connections = [];

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

	socket.on('register user', function (username) {
		console.log('register user');
		connections.push(socket.id);
		users.push(username);
		socket.emit("add user", {'msg' : 'All good'});
	});


	socket.on('disconnect', function(){
		for(var i = 0; i < connection.length; i ++){
			if(connections[i] = socket.id) {
				connections.splice(i, 1);
				users.splice(i, 1);
				break;
			}
		}

		console.log('client disconnect');
	});
});