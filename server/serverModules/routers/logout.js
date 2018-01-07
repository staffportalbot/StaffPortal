// Setting up
const express = require("express");
const app = express.Router();

app.get("/logout", async (req, res) => {
	req.session.destroy();
	res.redirect("/");
});

module.exports = app;

module.exports.info = {
	name: "Logout",
};
