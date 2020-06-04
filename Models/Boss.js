const Entity = require("./Entity");

class Boss extends Entity {
	constructor(stats, x, y, angle) {
		super(x, y, angle);
		this.stats = stats; //{ maxHp: 100, speed: 10, etc. }

		this.team = 2;

		this.hp = stats.maxHp;
		this.maxHp = stats.maxHp;
	}
}

module.exports = Boss;
