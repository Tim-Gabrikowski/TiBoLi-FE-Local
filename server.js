const express = require("express");
const handleError = require("./errorHandling");
require("dotenv").config();
const colors = require("colors");
const app = express();
const port = process.env.BUILD_PORT || 8083;

app.use("/", express.static("dist/TiBoLi-FE-Local"));

app.listen(port, () => {
	console.log("Build Server online on Port:", port);
	console.log(" http://0.0.0.0:" + port);
});

process.on("uncaughtException", handleError);
