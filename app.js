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

const ARGUMENTS = process.argv.slice(2);
var SOCKET_LIST = {};

var count = 0;

io.sockets.on('connection', function(socket) {
	socket.id = ++count;

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

	socket.on('requestId', function() {
		socket.emit('responseId', socket.id);
	});

	socket.on('getServerList', function() {
		socket.emit('serverList', Server.serverList);
	});

	socket.on('clientConnecting', function() {

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


class Server {
	constructor(map = "./maps/test.map", connectedSockets = new Array(), state = "waiting") {
		this.maxSockets = 4;

		this.id = ++count;
		this.map = map;
		if (connectedSockets.length <= this.maxSockets) {
			this.connectedSockets = connectedSockets;
		} else {
			throw "Too many Sockets in Server creation. Max Clients: " + this.maxSockets;
		}
		this.state = state; //ready, waiting, running, empty

		Server.serverList[this.id] = this;
	}

	getSocketCount() {
		return this.connectedSockets.length;
	}

	addClient(client) {
		if (this.connectedSockets.length < this.maxSockets){
			this.connectedSockets.push(client);
		} else {
			throw "Server is already full";
		}
	}

	static getEmptyServers() {
		let results = {}, key;

		for (key in Server.serverList) {
			console.log(Server.serverList[key].connectedSockets.length === 0);
		}
	}

	static count = 0;
	static serverList = {};
}

new Server();
new Server("test", ["hi", "pups", "waiting"]);
new Server();
