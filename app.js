const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {});

const Player = require('./Models/Player');
const Projectile = require('./Models/Projectile');
const Entity = require('./Models/Entity');


app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log("Server started");

var SOCKET_LIST = {};

io.sockets.on('connection', function(socket) {
	socket.id = Math.floor(Math.random()*100);

	SOCKET_LIST[socket.id] = socket;

	Player.onConnect(socket);

	console.log("socket " + socket.id + " connected");

	socket.emit('serverMsg', {
		msg:'Your Server - Online! 24/7 ;)',
	});

	socket.on('pingRequest', function() {
		socket.emit('pingResponse');
	});

	socket.on('disconnect', function() {
		console.log("socket " + socket.id + " disconnected");
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
	});
});


// DO THE LOOP HERE
// EMIT POSITIONS FROM ALL PLAYERS TO ALL PLAYERS


setInterval(function() {
	var pack = {
		player: Player.update(),
		projectile: Projectile.update()
	}

	for (var i in SOCKET_LIST) {
		var socket = SOCKET_LIST[i];
		socket.emit('init', Entity.initPack);
		socket.emit('update', pack);
		socket.emit('remove', Entity.removePack);
	}

	Entity.initPack = {player:[], projectile:[]};
	Entity.removePack = {player:[], projectile:[]};

}, 1000/25);

module.exports = Player;
