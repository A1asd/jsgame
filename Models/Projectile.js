const Entity = require("./Entity");

class Projectile extends Entity {
	constructor(position, direction) {
		super(position, direction);
	}
}

module.exports = Projectile;
