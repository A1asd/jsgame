const Entity = require('./Entity');
const Projectile = require('./Projectile');
const Skill = require('../Skills/Skill');

class Player extends Entity {
	constructor(id, stats, x, y, angle) {
		super(x, y, angle);
		
		this.id = id;

		this.keyStates = {
			up: false,
			down: false,
			left: false,
			right: false,
			attack: false,
		}

		this.mouseAngle = 0;
		this.maxSpd = stats.speed;

		this.hp = stats.maxHp;
		this.maxHp = stats.maxHp;

		this.team = 1;

		this.score = 0;

		this.skills = {
			skill1: new Skill().homingMissiles(),
		}

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
		if (this.angle < 25 || this.angle > 339) return "up"; //usw.
		if (this.angle < 70) return "upright";
		if (this.angle < 115) return "right";
		if (this.angle < 160) return "downright";
		if (this.angle < 205) return "down";
		if (this.angle < 250) return "downleft";
		if (this.angle < 295) return "left";
		if (this.angle < 340) return "leftup";
	}

	update() {
		this.updateSpeed();
		super.update();

		if (this.keyStates.attack) {
			this.attack(this.mouseAngle);
		}
	}

	attack(angle) {
		var pro = new Projectile(this, this.x, this.y, angle);
		Entity.initPack.projectile.push(pro.getInitPack());
	}

	getInitPack() {
		return this;
	}

	getUpdatePack() {
		return this;
	}

	static onConnect(socket) {
		var player = new Player(socket.id, {hp: 10, maxHp: 10, speed: 2}, 250, 150, 0);
		Entity.initPack.player.push(player.getInitPack());

		socket.on('keystateUpdate', function(data) {
			player.keyStates.up = data.moveUp;
			player.keyStates.down = data.moveDown;
			player.keyStates.left = data.moveLeft;
			player.keyStates.right = data.moveRight;
			player.keyStates.attack = data.attack;
			player.mouseAngle = Math.atan2(data.mouseAngle.y - player.y, data.mouseAngle.x - player.x) / Math.PI * 180;
		});

		var players = [];
		for (var i in Entity.playerList) {
			players.push(Entity.playerList[i].getInitPack());
		}

		var projectiles = [];
		for (var i in Entity.projectileList) {
			projectiles.push(Entity.projectileList[i].getInitPack());
		}
		socket.emit('init', {
			player: players,
			projectile: projectiles,
		})
	}

	static onDisconnect(socket) {
		delete Entity.playerList[socket.id];
		Entity.removePack.projectile.push(socket.id);
	}

	static update() {
		var pack = [];
		for (var i in Entity.playerList) {
			var player = Entity.playerList[i];
			player.update();
			pack.push(player.getUpdatePack());
		}
		return pack;
	}
}

module.exports = Player;
