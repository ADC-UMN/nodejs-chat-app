const storage = require("../storage/db");

const authMiddleware = async (req, res, next) => {
	const username = req.session.username;
	const password = req.session.password;

	if (!username || !password) {
		return res.status(401).redirect("/");
	}

	let user = storage.getUser(username);

	if (!user) {
		return res.status(401).redirect("/");
	}

	if (user.password !== password) {
		return res.status(401).redirect("/");
	} else {
		req.username = user.username;
		return next();
	}
};

module.exports = {
	authMiddleware,
};
