class Skill {
	constructor(caster) {
		this.caster = caster;
	}

	castStart() {

	}

	castOngoing() {

	}

	castEnd() {

	}

	castCancel() {

	}

	isEnemy(target) {
		return target.team !== caster.team
	}

	isFriend(target) {
		return target.team === caster.team
	}

	static targets = [];

	static skillsOnCooldown = {};
}

module.exports = Skill;
