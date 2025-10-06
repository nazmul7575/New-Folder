document.addEventListener("DOMContentLoaded", main());

let result = 0;

function main() {
	const output = document.getElementById("output");
	const incrementInp = document.getElementById("increment_inp");
	const incrementBtn = document.getElementById("name_btn");
	const decrementInp = document.getElementById("decrement_inp");
	const decrementBtn = document.getElementById("decrement_btn");

	displayResult(output);
}

function displayResult(output) {
	let finalResult = null;
	if (result < 10) {
		finalResult = `0${result}`;
	}
	output.innertext = result;
}
