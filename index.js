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
    socket.emit("user added", {"mes" : "All good"});
});


socket.on('new message', function(message){
	socket.emit('new message', message);
});

});