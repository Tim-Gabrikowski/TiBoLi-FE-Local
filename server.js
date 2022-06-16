const express = require("express");
const handleError = require("./errorHandling");
require("dotenv").config();
const colors = require("colors");
const app = express();
const port = process.env.BUILD_PORT || 8083;

const booksApiRouter = require(process.env.RELATIVE_PATH_TO_BACKEND_MODULE);
const pdfApiRouter = require(process.env.RELATIVE_PATH_TO_PDF_MODULE);

app.use("/api/", booksApiRouter);
app.use("/pdf/", pdfApiRouter);
app.use(express.static("dist/TiBoLi-FE-Local"));
app.use("*", (req, res) => {
	res.sendFile(__dirname + "/dist/TiBoLi-FE-Local/index.html");
});
app.listen(port, "0.0.0.0", () => {
	console.log("Build Server online on Port:", port);
	console.log(" http://0.0.0.0:" + port);
});

process.on("uncaughtException", handleError);
