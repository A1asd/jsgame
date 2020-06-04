//init
class Player {
	constructor(initPackage) {
		this.id = initPackage.id;
		this.x = initPackage.x;
		this.y = initPackage.y;
		this.hp = initPackage.hp;
		this.maxHp = initPackage.maxHp;
		this.score = initPackage.score;

		switch (this.id) {
			case 0: this.color = "red"; break;
			case 1: this.color = "green"; break;
			case 2: this.color = "blue"; break;
			case 3: this.color = "yellow"; break;
			default: this.color = "white";
		}

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
