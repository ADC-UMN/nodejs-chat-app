const storage = require("../storage/db");

const getMessages = async (req, res) => {
	let roomID = req.params.roomID;

	let room = storage.getRoom(roomID);
	let username = req.username;
	if (!room.users.includes(username)) {
		return res.sendStatus(401);
	}

	let lastMessageId = String(req.query.after);

	if (req.query.after == null || req.query.after == undefined) {
		return res.send(room.messages);
	} else {
		if (room.messages.length <= 1) {
			return res.send([]);
		}

		let messages = room.messages;
		let sliceIndex = null;
		for (let i = messages.length - 1; i >= 0; i--) {
			if (messages[i].messageID == lastMessageId) {
				sliceIndex = i;
				break;
			}
		}
		return res.send(messages.slice(sliceIndex ? sliceIndex + 1 : null));
	}
};
const postMessage = async (req, res) => {
	let content = req.body.content;

	if (!content) {
		return res.status(400).send();
	}
	await storage.saveMessage(req.username, req.params.roomID, content);

	res.status(200).send();
};

const newRoom = async (req, res) => {
	var selectedUsers = req.body.selectedUsers;
	if (!selectedUsers) {
		return res.sendStatus(400);
	}

	selectedUsers.push(req.session.username);

	let roomID = await storage.createRoom(selectedUsers);

	return res.status(200).send({
		room: roomID,
	});
};

module.exports = {
	getMessages,
	postMessage,
	newRoom,
};
