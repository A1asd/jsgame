var express = require('express');
var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log("Server started");

var io = require('socket.io')(server, {});
io.sockets.on('connection', function(socket) {
	console.log('socket connected');

	socket.on('updatePosition', function(data) {
		Player.position.x = data.x;
		Player.position.y = data.y;
	});

	socket.emit('serverMsg', {
		msg:'hello',
	});
});





class Entity {
	constructor(position, direction) {
		this.position = position;
		this.direction = direction;
	}
}

class Player extends Entity {
	constructor(id, position, direction) {
		super(position, direction);
	}

	move(x, y) {
		this.position.x = x;
		this.position.y = y;
	}

	update() {

	}
}

class Projectile extends Entity {
	constructor(position, direction) {
		super(position, direction);
	}
}

class Weapon {
	constructor() {
	}
}
