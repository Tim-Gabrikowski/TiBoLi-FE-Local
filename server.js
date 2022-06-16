const express = require("express");
const handleError = require("./errorHandling");
require("dotenv").config();
const colors = require("colors");
const app = express();
const port = process.env.BUILD_PORT || 8083;

var fs = require("fs");
var util = require("util");
var logFile = fs.createWriteStream("log.txt", { flags: "a" });
// Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
	logFile.write(util.format.apply(null, arguments) + "\n");
	logStdout.write(util.format.apply(null, arguments) + "\n");
};
console.error = console.log;

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
