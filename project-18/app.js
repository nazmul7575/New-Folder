document.addEventListener("DOMContentLoaded", main);

let result = 0;

function main() {
	const output = document.getElementById("output");
	const incrementInp = document.getElementById("increment_inp");
	const incrementBtn = document.getElementById("increment_btn");
	const decrementInp = document.getElementById("decrement_inp");
	const decrementBtn = document.getElementById("decrement_btn");

	displayResult(output);

	incrementBtn.addEventListener("click", function () {
		const increment = parseInt(incrementInp.value);
		result += increment;
		displayResult(output);
	});

	decrementBtn.addEventListener("click", function () {
		const decrement = parseInt(decrementInp.value);
		result -= decrement;
		displayResult(output);
	});

	incrementInp.addEventListener("keyup", handleInputs);
	decrementInp.addEventListener("keyup", handleInputs);
}

function displayResult(output) {
	if (result < 0) {
		result = 0;
		alert("Result Can Not Be Negative");
	}

	let finalResult = result;
	if (result < 10) {
		finalResult = `0${result}`;
	}
	output.innerText = finalResult;
}

function handleInputs(e) {
	if (parseInt(e.target.value) > 100) {
		e.target.value = 100;
	}

	if (parseInt(e.target.value) < 0) {
		e.target.value = 0;
	}
}
