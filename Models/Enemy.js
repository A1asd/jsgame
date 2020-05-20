const Entity = require("./Entity");

class Enemy extends Entity {
	constructor(x, y, angle) {
		super(x, y, angle);
	}
}

module.exports = Enemy;
