class Map {
	constructor(id, path, collisionMap, mapConfig) {
		this.id = id;
		this.path = path;
		this.collisionMap = collisionMap;
		this.mapConfig = mapConfig;
	}
}

module.exports = Map;
