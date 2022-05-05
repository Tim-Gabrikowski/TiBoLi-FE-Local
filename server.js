const express = require("express");
const handleError = require("./errorHandling");
const colors = require("colors");
const app = express();
const port = 80;

app.use("/", express.static("dist/TiBoLi-FE-Local"));

app.listen(port, () => {
	console.log("Build Server online on Port:", port);
	console.log(" http://0.0.0.0:" + port);
});

process.on("uncaughtException", handleError);
