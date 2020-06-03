class Renderer {
	constructor(config) {
		this.config = config;
	}

	updateConfig(config) {
		this.config = config;
	}

	drawPlayerSprite(player) {
		ctx.globalCompositeOperation = "source-over";
	}

	clearScreen() {
		ctx.clearRect(0, 0, this.config.clientWidth, this.config.clientHeight);
	}

	draw(player, x, y) {
		//outline demo:
		let img = new Image();

		img.src = player.sprite.src;

		let hpWidth = 200 * player.hp / player.maxHp;

		//ctx.fillRect(x - hpWidth / 2, y - 40, hpWidth, 4);
		hpBar.style.width = hpWidth;
		ctx.fillText(player.score, x, y - 60);

		let dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
			s = this.config.outlineThickness;

		// draw images at offsets from the array scaled by s
		for (let i = 0; i < dArr.length; i += 2)
			ctx.drawImage(img, x + dArr[i]*s, y + dArr[i+1]*s, 30, 30);

		// fill with color
		ctx.globalCompositeOperation = "source-in";
		ctx.fillStyle = "red";
		ctx.fillRect(0, 0 ,this.config.clientWidth, this.config.clientHeight);

		// draw original image in normal mode
		ctx.globalCompositeOperation = "source-over";
		ctx.drawImage(img, x, y, 30, 30);
	}
}

setInterval(function() {
	renderer.clearScreen();
	for (let i in Player.list) {
		renderer.draw(Player.list[i], Player.list[i].x, Player.list[i].y);
	}
	ctx.fillStyle = "black";
	for (let i in Projectile.list) {
		ctx.fillRect(Projectile.list[i].x-2, Projectile.list[i].y-2, 4, 4);
	}
}, 40);
