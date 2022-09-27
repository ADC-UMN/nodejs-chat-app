const storage = require("../storage/db");

const signIn = async (req, res) => {
	let user = await storage.getUser(req.body.username);
	if (!user) {
		await storage.saveUser(req.body.username, req.body.password);
	}
	req.session.username = req.body.username;
	req.session.password = req.body.password;
	return res.status(200).send({
		signedIn: true,
	});
};

const signOut = async (req, res) => {
	req.session = null;
	return res.status(200).send();
};

module.exports = {
	signIn,
	signOut,
};
