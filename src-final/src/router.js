const { Router } = require("express");
const routes = Router();

const viewController = require("./controllers/viewController");
const authController = require("./controllers/authController");
const roomController = require("./controllers/roomController");

const authMiddleware = require("./middleware/authMiddleware").authMiddleware;

/**
 * Views
 */
routes.get("", viewController.signIn);
routes.get("/home", authMiddleware, viewController.home);
routes.get("/room/:roomID", authMiddleware, viewController.room);
routes.get("/newRoom", authMiddleware, viewController.newRoom);

/**
 * Auth API
 */
routes.post("/api/auth/signIn", authController.signIn);
routes.get("/api/auth/signOut", authController.signOut);

/**
 * Chat API
 */
routes.get("/api/room/:roomID/messages", authMiddleware, roomController.getMessages);
routes.post("/api/room/:roomID/messages", authMiddleware, roomController.postMessage);
routes.post("/api/newRoom", authMiddleware, roomController.newRoom);

module.exports = routes;
