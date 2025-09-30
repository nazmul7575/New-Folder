/**
 * Project Requirements:
 * - Change the background color by generating random hex color by clicking a button
 * - Also display the hex code to a disabled input field
 * - Add a button to copy the color code
 */

// Steps

// Step 1 - create onload handler

document.addEventListener("DOMContentLoaded", main);

function main() {
	const root = document.getElementById("root");
	const output = document.getElementById("output");
	const changeBtn = document.getElementById("change_btn");
	const copyBtn = document.getElementById("copy_btn");

	changeBtn.addEventListener("click", function () {
		const bgColor = generateHexColor();

		root.style.backgroundColor = bgColor;
		output.value = bgColor;
	});

	copyBtn.addEventListener("click", function () {
		navigator.clipboard.writeText(output.value);
	});
}

// step 2 - random color generator function
function generateHexColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	// this is not clear to me, ask mehedi
	return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}

// Step 3 - collect all necessary references

// Step 4 - handle the change button click event
// Step 5 - handle the copy button click event
