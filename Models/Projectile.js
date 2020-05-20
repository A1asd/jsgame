const Entity = require("./Entity");
const Player = require("./Player");

class Projectile extends Entity {
	constructor(parent, x, y, angle) {
		super(x, y, angle);
		this.parent = parent;
		this.id = Math.random();
		this.speedX = Math.cos(angle/180*Math.PI) *10;
		this.speedY = Math.sin(angle/180*Math.PI) *10;

		this.timer = 0;
		this.toRemove = false;

		Entity.projectilelist[this.id] = this;
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
				//make dmg etc.
				if(Math.random() < 0.1) {
					console.log("5 magisch");
				} else {
					console.log("2");
				}
				
				this.toRemove = true;
			}
		}
	}

	static update() {
		var pack = [];
		for (var i in Entity.projectilelist) {
			var projectile = Entity.projectilelist[i];
			
			projectile.update();
			if (projectile.toRemove) {
				delete Entity.projectilelist[i];
			} else {
				pack.push({
					x: projectile.x,
					y: projectile.y,
				});
			}
		}
		return pack;
	}
}

module.exports = Projectile;
