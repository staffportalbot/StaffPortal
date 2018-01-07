// STAFFPORTAL CORE
const { Console } = require("./Modules/");

global.winston = new Console("master");

winston.info(`Logging to ${require("path").join(process.cwd(), `logs/master-staffportal.log`)}.`);

// Gonna have this here for now
require("./server/")

process.on("uncaughtException", err => {
	winston.error("An unknown and unexpected error occurred, and we failed to handle it. Sorry! x.x\n", err);
	process.exit(1);
});

process.on("unhandledRejection", err => {
	winston.error("An unknown and unexpected error occurred, and we failed to handle it. Sorry! x.x\n", err);
	process.exit(1);
});