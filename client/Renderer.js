class Renderer {
	constructor(config) {
		this.config = config;
	}

	updateConfig(config) {
		this.config = config;
	}

	drawPlayerSprite(player) { //TODO: add animation (e.g. ++currentFrame, Animationclass, etc.)
		ctx.globalCompositeOperation = "source-over";

		let img = new Image();
		img.src = player.sprite.src;

		let dArr = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1], // offset array
			s = this.config.outlineThickness;

		for (let i = 0; i < dArr.length; i += 2)
			ctx.drawImage(img.src, player.x + dArr[i]*s, player.y + dArr[i+1]*s, 30, 30);

		// fill with color
		ctx.globalCompositeOperation = "source-in";
		ctx.fillStyle = player.color;
		ctx.fillRect(0, 0 ,this.config.clientWidth, this.config.clientHeight);

		// draw original image in normal mode
		ctx.globalCompositeOperation = "source-over";
		ctx.drawImage(img.src, player.x, player.y, 30, 30);
	}

	drawMap(map) {
		ctx.globalCompositeOperation = "source-over";
	}

	drawUi() {
		//outline demo:
		let hpWidth = 200 * player.hp / player.maxHp; //TODO: make this work!

		//ctx.fillRect(x - hpWidth / 2, y - 40, hpWidth, 4);
		hpBar.style.width = hpWidth;
		ctx.fillText(player.score, player.x, player.y - 60);
	}

	clearScreen() {
		ctx.clearRect(0, 0, this.config.clientWidth, this.config.clientHeight);
	}

	draw() {
		this.drawMap(map)

		// draw images at offsets from the array scaled by s
		for (let i in Player.list) {
			this.drawPlayerSprite(Player.list[i]);
		}

		this.drawUi();
	}
}

setInterval(function() {
	renderer.clearScreen();

	renderer.draw();

	ctx.fillStyle = "black";
	for (let i in Projectile.list) {
		ctx.fillRect(Projectile.list[i].x-2, Projectile.list[i].y-2, 4, 4);
	}

	renderer.drawUi();
}, 40);
