const Entity = require("../Models/Entity");

class Skill {
	constructor() {
		this.id = ++Skill.count;
	}

	castStart(caster) {
		this.caster = caster;
		this.casting = true;
	}

	castOngoing() {
		this.casting = true;
	}

	castEnd() {
		this.casting = false;
	}

	castCancel() {
		this.casting = false;
	}

	isCasting() {
		return this.casting;
	}

	isEnemy(target) {
		return target.team !== caster.team
	}

	isFriend(target) {
		return target.team === caster.team
	}

	homingMissiles(stats) {
		this.stats = stats;
		/*
			stats = [
				{type: "range", value: 50},
				{type: "damage", hit_count: 7, damage: 2},
				{type: "target"},
				{type: "cooldown", value: 10},
			],
		*/
		this.count = 7;
		this.damage = 10;
		this.range = 50;
	}

	healingField(stats) {
		/*
			stats = [
				{type: "range", value: 20},
				{type: "buff", status: "refresh", duration: 10, stack: 5},
				{type: "ground", radius: 20},
				{type: "cooldown", value: 5},
			],
		*/
		this.stats = stats;
	}

	static targets = [];

	static skillsOnCooldown = {};

	static count = 0;
}

module.exports = Skill;
