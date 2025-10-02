/**
 *  Date: 02-10-2025
 * Author: Md. Nazmul Islam
 *  Description: Color picker application with huge dom functionalities
 */

// Globals
let div = null;

// onload hendler
document.addEventListener("DOMContentLoaded", main);

//  main or boot function, this function will take care of getting all the DOM references
function main() {
	const generateRandomColorBtn = document.getElementById(
		"generate_random_color"
	);
	const colorModeHexInp = document.getElementById("input_hex");

	generateRandomColorBtn.addEventListener(
		"click",
		handleGenerateRandomColorBtn
	);

	colorModeHexInp.addEventListener("keyup", handleColorModeHexInp);

	// copyBtn.addEventListener("click", function () {
	// 	navigator.clipboard.writeText(`#${output.value}`);
	// 	if (div !== null) {
	// 		div.remove();
	// 		div = null;
	// 	}
	// 	if (isValidHex(output.value)) {
	// 		generateToastMessage(`#${output.value} copied`);
	// 	} else {
	// 		alert("Invalid Color Code");
	// 	}
	// });

	// copyBtn2.addEventListener("click", function () {
	// 	navigator.clipboard.writeText(`#${output2.value}`);
	// 	if (div !== null) {
	// 		div.remove();
	// 		div = null;
	// 	}
	// 	if (isValidHex(output.value)) {
	// 		generateToastMessage(`#${output2.value} copied`);
	// 	} else {
	// 		alert("Invalid Color Code");
	// 	}
	// });
}

// Events handlers
function handleGenerateRandomColorBtn() {
	const color = generateColorDecimal();
	updateColorCodeToDom(color);
}

function handleColorModeHexInp(e) {
	const hexColor = e.target.value;
	if (hexColor) {
		this.value = hexColor.toUpperCase();
		if (isValidHex(hexColor)) {
			const color = hexToDecimalColors(hexColor);
			updateColorCodeToDom(color);
		}
	}
}

// DOM functions
function generateToastMessage(msg) {
	div = document.createElement("div");
	div.innerText = msg;
	div.className = "toast-message toast-message-slide-in";

	div.addEventListener("click", function () {
		div.classList.remove("toast-message-slide-in");
		div.classList.add("toast-message-slide-out");

		div.addEventListener("animationend", function () {
			div.remove();
			div = null;
		});
	});

	document.body.appendChild(div);
}

/**
 * update dom elements with calculate colors values
 * @param {object} color
 */
function updateColorCodeToDom(color) {
	const hexColor = generateHexColor(color);
	const rgbColor = generateRGBColor(color);

	document.getElementById(
		"color_display"
	).style.backgroundColor = `#${hexColor}`;
	document.getElementById("input_hex").value = hexColor;
	document.getElementById("input_rgb").value = rgbColor;
	document.getElementById("color_slider_red").value = color.red;
	document.getElementById("color_slider_red_label").innerText = color.red;
	document.getElementById("color_slider_green").value = color.green;
	document.getElementById("color_slider_green_label").innerText = color.green;
	document.getElementById("color_slider_blue").value = color.blue;
	document.getElementById("color_slider_blue_label").innerText = color.blue;
}
// Utils

/**
 * generate and return an object of three color decimal values
 * @returns {object}
 */
function generateColorDecimal() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return {
		red,
		green,
		blue,
	};
}

/**
 * take a color object of three decimal values and return a hexadecimal color code
 * @param {object} color
 * @returns {string}
 */
function generateHexColor({ red, green, blue }) {
	const getTwoCode = (value) => {
		const hex = value.toString(16);
		return hex.length === 1 ? `0${hex}` : hex;
	};

	return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
		blue
	)}`.toUpperCase();
}

/**
 * take a color object of three decimal values and return a rgb color code
 * @param {object} color
 * @returns {string}
 */
function generateRGBColor({ red, green, blue }) {
	return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * convert hex color to decimal color object
 * @param {string} hex
 * @returns {object}
 */
function hexToDecimalColors(hex) {
	const red = parseInt(hex.slice(0, 2), 16);
	const green = parseInt(hex.slice(2, 4), 16);
	const blue = parseInt(hex.slice(4), 16);

	return {
		red,
		green,
		blue,
	};
}

/**
 * vilidate hex color code
 * @param {string} color;
 * @returns {boolean}
 */

function isValidHex(color) {
	if (color.length !== 6) return false;
	return /^[0-9A-Fa-f]{6}$/i.test(color);
}

// Step 1 - create onload handler

// step 2 - random color generator function

// step 3 - collect all necessary references

// step 4 - handle the change button click event

// step 5 - handle the copy button click event

// Step 6 - activate toast message

// Step 7 - create a dynamic toast message

// step 8 - clear toast message

// step 9 - create isHexValid function

// step 10 - implement change handler on input field

// step 11 - prevent copying hex code if it is not valid

// step 12 - refactor the color generator function

// step 13 - update color code to display rgb colors

// step 14 - create hex to rgb function

// step 15 - update change handler

// step 16 - implement copy function
