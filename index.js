var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {

//при подключении
socket.on('add user', function (username) {
    socket.username = username;
});


socket.on('new message', function(message){
	var socketid;

	var clients = io.sockets.clients();

	for(var i = 0; i < clients.length; i++){
		if (clients[i].username == message.username) {
			socketid = clients[i].id;
		}
	}

	io.to(socketid).emit('new message', message);
});

});