const express = require("express");
const { engine } = require("express-handlebars");
const cookieSession = require("cookie-session");
const routes = require("./src/router");

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
app.use("", routes);

// Start the app, listen on a port. Computers have ports numbering from
// 1024–49151 but it's common to use ports between 3000-5000. Other
// ports may be used by system processes. NodeJS will crash if another
// application is using the port it's trying to start on.
app.listen(process.env.PORT ?? 4000, () => {
	// Log when the server has started, as well as the URL it's started at.
	console.log(`Server running at http://localhost:${process.env.PORT ?? 4000}`);
});
