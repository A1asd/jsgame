class Entity {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speedX = 0;
		this.speedY = 0;
	}

	update() {
		this.updatePosition();
	}

	updatePosition() {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	getDistance(pt) {
		return Math.sqrt(Math.pow(this.x - pt.x, 2) + Math.pow(this.y - pt.y, 2));
	}

	static playerList = {};

	static enemyList = {};

	static projectileList = {};

	static initPack = {player:[], projectile:[]};
	static removePack = {player:[], projectile:[]};
}

module.exports = Entity;
