const color = require("colors");

function handleError(err) {
	console.log(getDate().red);

	console.log("Error:");
	console.log(err);

	console.log("=========".gray);
}

function getDate() {
	var today = new Date();

	return (
		today.toLocaleDateString("de-DE") +
		" " +
		today.toLocaleTimeString("de-DE")
	);
}

module.exports = handleError;
