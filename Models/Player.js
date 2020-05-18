const Entity = require('./Entity.js');

class Player extends Entity {
	constructor(id, position, direction) {
		super(position, direction);
		
		this.keyStates = {
			up: false,
			down: false,
			left: false,
			right: false,
		}
		this.maxSpd = 10;

		Player.list[id] = this;
	}

	updatePosition() {
		if (this.keyStates.up) this.position.y -= this.maxSpd;
		if (this.keyStates.down) this.position.y += this.maxSpd;
		if (this.keyStates.left) this.position.x -= this.maxSpd;
		if (this.keyStates.right) this.position.x += this.maxSpd;
	}

	updateAnimation() {
		currentFrame += 1;
	}

	move(x, y) {
		this.position.x = x;
		this.position.y = y;
	}

	update() {
		this.updatePosition();
		this.updateAnimation();
	}

	static onConnect(socket) {
		var player = new Player(socket.id, { x: 250, y: 150 }, "left");

		socket.on('keystateUpdate', function(data) {
			player.keyStates.up = data.moveUp;
			player.keyStates.down = data.moveDown;
			player.keyStates.left = data.moveLeft;
			player.keyStates.right = data.moveRight;
		});
	}

	static onDisconnect(socket) {
		delete this.list[socket.id];
	}

	static update() {
		var pack = [];
		for (var i in this.list) {
			var player = this.list[i];
			player.update();
			pack.push({
				x: player.position.x,
				y: player.position.y,
			});
		}
		return pack;
	}

	static list = {};
}

module.exports = Player;
