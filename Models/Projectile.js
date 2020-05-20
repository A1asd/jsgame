const Entity = require("./Entity");

class Projectile extends Entity {
	constructor(parent, x, y, angle) {
		super(x, y, angle);
		this.parent = parent;
		this.id = Math.random();
		this.speedX = Math.cos(angle/180*Math.PI) * 10;
		this.speedY = Math.sin(angle/180*Math.PI) * 10;

		this.timer = 0;
		this.toRemove = false;

		Entity.projectileList[this.id] = this;
	}

	update() {
		if (this.timer++ > 100) {
			this.toRemove = true;
		}
		super.update();
		//collision
		for (var i in Entity.playerList) {
			var player = Entity.playerList[i];
		
			if (this.getDistance(player) < 32 && this.parent !== player) {

				player.hp -= 1;
				var shooter = Entity.playerList[this.parent];

				if (player.hp <= 0) {
					if (shooter) {
						shooter.score += 1;
					}

					player.hp = player.maxHp;
					player.x = Math.random() * 500;
					player.y = Math.random() * 250;
				}
				
				this.toRemove = true;
			}
		}
	}

	getInitPack() {
		return this;
	}

	getUpdatePack() {
		return this;
	}

	static update() {
		var pack = [];
		for (var i in Entity.projectileList) {
			var projectile = Entity.projectileList[i];
			
			projectile.update();
			if (projectile.toRemove) {
				Entity.removePack.projectile.push(projectile.id);
				delete Entity.projectileList[i];
			} else {
				pack.push(projectile.getUpdatePack());
			}
		}
		return pack;
	}
}

module.exports = Projectile;
