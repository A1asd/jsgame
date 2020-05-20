const Entity = require('./Entity');
const Projectile = require('./Projectile');

class Player extends Entity {
	constructor(id, x, y, angle) {
		super(x, y, angle);
		
		this.keyStates = {
			up: false,
			down: false,
			left: false,
			right: false,
			attack: false,
		}

		this.mouseAngle = 0;
		this.maxSpd = 2;

		Entity.playerList[id] = this;
	}

	updateSpeed() {
		if (this.keyStates.up) this.speedY -= this.maxSpd;
		else if (this.keyStates.down) this.speedY += this.maxSpd;
		else this.speedY = 0;
		if (this.keyStates.left) this.speedX -= this.maxSpd;
		else if (this.keyStates.right) this.speedX += this.maxSpd;
		else this.speedX = 0;
	}

	move(x, y) {
		this.x = x;
		this.y = y;
	}

	getFacingDirection() {
		if (this.angle < 25 || this.angle > 330) return "up"; //usw.
	}

	update() {
		this.updateSpeed();
		super.update();

		if (this.keyStates.attack) {
			this.attack(this.mouseAngle);
		}
	}

	attack(angle) {
		new Projectile(this, this.x, this.y, angle);
	}

	static onConnect(socket) {
		var player = new Player(socket.id, 250, 150, 0);

		socket.on('keystateUpdate', function(data) {
			player.keyStates.up = data.moveUp;
			player.keyStates.down = data.moveDown;
			player.keyStates.left = data.moveLeft;
			player.keyStates.right = data.moveRight;
			player.keyStates.attack = data.attack;
			player.mouseAngle = data.mouseAngle;
		});
	}

	static onDisconnect(socket) {
		delete this.list[socket.id];
	}

	static update() {
		var pack = [];
		for (var i in Entity.playerList) {
			var player = Entity.playerList[i];
			player.update();
			pack.push({
				x: player.x,
				y: player.y,
			});
		}
		return pack;
	}
}

module.exports = Player;
