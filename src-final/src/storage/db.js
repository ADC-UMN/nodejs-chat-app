const { randomUUID } = require("crypto");
const fs = require("fs");
var path = require("path");

const filepath = path.join(__dirname, "../../.data/");
const filename = path.join(__dirname, "../../.data/", "CHAT_STORE.json");
const defaultData = require("./defaultData.json");

class Storage {
	constructor() {
		this.readFromFile();
	}

	getUsers() {
		return Object.keys(this.data.users).sort();
	}

	getUser(username) {
		return this.data.users[username] ?? null;
	}

	async saveUser(username, password) {
		this.data.users[username] = {
			username: username,
			password: password,
			rooms: [],
		};
		await this.save();
	}

	getRoom(roomID) {
		return this.data.rooms[roomID] ?? null;
	}

	getRoomsForUser(username) {
		let roomIDs = this.data.users[username]?.rooms;
		if (!roomIDs) {
			return [];
		}
		let rooms =
			roomIDs?.map((roomID) => {
				return this.data.rooms[roomID];
			}) ?? [];
		return rooms;
	}

	async createRoom(userIDs) {
		let roomID = randomUUID();
		for (let i = 0; i < userIDs.length; i++) {
			const userID = userIDs[i];
			this.data.users[userID].rooms.push(roomID);
		}
		this.data.rooms[roomID] = {
			id: roomID,
			users: userIDs,
			messages: [],
		};
		await this.save();
		return roomID;
	}

	getMessages(roomID) {
		return this.data.rooms[roomID]?.messages ?? [];
	}

	async saveMessage(username, roomID, content) {
		this.data.rooms[roomID].messages.push({
			messageID: randomUUID(),
			user: username,
			content: content,
		});
		await this.save();
	}

	// ==== Helpers ====

	async save() {
		await fs.promises.writeFile(filename, JSON.stringify(this.data));
	}

	readFromFile() {
		if (!fs.existsSync(filepath)) {
			fs.mkdirSync(filepath);
		}
		if (!fs.existsSync(filename)) {
			fs.writeFileSync(filename, JSON.stringify(defaultData));
		}
		try {
			const data = fs.readFileSync(filename);
			this.data = JSON.parse(data);
		} catch (err) {
			console.error("Could not read storage file,", err);
			this.data = defaultData;
		}
	}

	toJSON() {
		return data;
	}
}

let storage = new Storage();

module.exports = storage;
