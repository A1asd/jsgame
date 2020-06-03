//init
class Player {
	constructor(initPackage) {
		this.id = initPackage.id;
		this.x = initPackage.x;
		this.y = initPackage.y;
		this.hp = initPackage.hp;
		this.maxHp = initPackage.maxHp;
		this.score = initPackage.score;
		Player.list[this.id] = this;
	}
	static list = {};
}

class Projectile {
	constructor(initPackage) {
		this.id = initPackage.id;
		this.x = initPackage.x;
		this.y = initPackage.y;
		Projectile.list[this.id] = this;
	}
	static list = {};
}

class Boss {
	constructor(initPackage) {
	}
	static list = {};
}
