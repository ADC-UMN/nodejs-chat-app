const express = require("express");
const { engine } = require("express-handlebars");
const cookieSession = require("cookie-session");

// Initialize the express app.
const app = express();

// Use session cookies (auth)
app.use(
	cookieSession({
		name: "session",
		// This is not-secure cause this is just an example app.
		// *Do not do this in a real app*
		keys: ["Key1", "Key2"],
	})
);

// Use the handlebars view engine, use the `./views` folder
// for finding views.
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.json());
