var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;



users = {};
//connections = [];

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

	socket.on('register user', function (username) {
		console.log('register user');
		if(users[username] === undefined) 
			users[username] = socket.id;
	});


	socket.on('print list users', function(){
		console.log('====START LIST USERS====');
		for(var key in users){
			console.log('Ключ: ' + key + '== socket.id - ' + users[key]);
		}
		console.log('====END LIST USERS====');
	});

	socket.on('delete user', function(user){
		console.log('deleting user is ===' + users[user]);
		delete users[user];
	});


	socket.on('disconnect', function(){
		for(var key in users){
			if(users[key] == socket.id) {
				delete users.key;
			}
		}

		console.log('client disconnect');
	});

	socket.on('new message', function(to, from, data, time, isMine, type){
		console.log('==========new MESSAGE===============');

		var id = "null";

		for(var key in  users){
			if(key == to) id = users[key];
			break;
		}

		io.to(id).emit('new message', {
			'username' : from,
			'message' : data,
			'time' : time,
			'isMine' : isMine,
			'type' : type,
		});

		console.log('============sended=============')
	});
});