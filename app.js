var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log("Server started");

var io = require('socket.io')(server,{});
io.sockets.on('connection', function(socket) {
	console.log('socket connected');

	socket.on('happy', function(data) {
		console.log('happy because ' + data.reason);
	});

	socket.emit('serverMsg', {
		msg:'hello',
	});
});