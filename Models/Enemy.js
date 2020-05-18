const Entity = require("./Entity");

class Enemy extends Entity {
	constructor() {
		super(position, direction);
	}
}

module.exports = Enemy;
