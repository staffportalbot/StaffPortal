// Setting up
const express = require("express");
const app = express.Router();
const passport = require("passport");

app.get("/login", passport.authenticate("discord", { scope: ["identify", "email", "guilds.join"], failureRedirect: "/" }), (req, res) => {
	res.redirect("/");
});

app.get("/login/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
	res.redirect("/");
});

module.exports = app;

module.exports.info = {
	name: "Login",
};
