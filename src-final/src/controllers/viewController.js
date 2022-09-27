const storage = require("../storage/db");

const home = (req, res) => {
	let rooms = storage.getRoomsForUser(req.session.username);

	return res.status(200).render("home", {
		rooms: rooms ?? [],
	});
};

const signIn = (req, res) => {
	if (req.session.username) {
		return res.redirect("/home");
	}

	return res.status(200).render("signIn");
};

const room = (req, res) => {
	const roomID = req.params.roomID;
	const room = storage.getRoom(roomID);

	return res.status(200).render("room", {
		room: room,
		user: req.session.username,
	});
};

const newRoom = (req, res) => {
	let users = storage.getUsers();
	users = users.filter((val) => {
		return val != req.session.username;
	});
	return res.status(200).render("newRoom", {
		users: users,
	});
};

module.exports = {
	home,
	signIn,
	room,
	newRoom,
};
