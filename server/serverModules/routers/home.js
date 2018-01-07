// Setting up
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
	res.render("index", { location: "index", title: "Home", req, res });
});

module.exports = app;

module.exports.info = {
	name: "Home",
};
