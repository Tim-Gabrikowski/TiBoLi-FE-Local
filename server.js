const express = require("express");
const handleError = require("./errorHandling");
require("dotenv").config();
const app = express();
const port = process.env.BUILD_PORT || 8083;

var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(
	__dirname +
		"/logs/log-" +
		getDate(false).replaceAll(".", "_").replaceAll(":", "_") +
		".log",
	{ flags: "w" }
);
var log_stdout = process.stdout;

console.log = function (d) {
	var timestamp = "[" + getDate(true) + "]";
	log_file.write(timestamp + " " + util.format(d) + "\n");
	log_stdout.write(util.format(d) + "\n");
};
console.error = console.log;
function getDate(space = true) {
	var today = new Date();

	if (space) {
		return (
			today.toLocaleDateString("de-DE") +
			" " +
			today.toLocaleTimeString("de-DE")
		);
	} else {
		return (
			today.toLocaleDateString("de-DE") +
			"-" +
			today.toLocaleTimeString("de-DE")
		);
	}
}

const booksApiRouter = require(process.env.RELATIVE_PATH_TO_BACKEND_MODULE);

app.use("/api", booksApiRouter);

app.use("/", express.static("dist/TiBoLi-FE-Local"));
app.use("*", (req, res) => {
	res.sendFile(__dirname + "/dist/TiBoLi-FE-Local/index.html");
});
app.listen(port, "0.0.0.0", () => {
	console.log("Build Server online on Port:", port);
	console.log(" http://0.0.0.0:" + port);
});

process.on("uncaughtException", handleError);
