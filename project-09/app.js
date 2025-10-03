/**
 *  Date: 02-10-2025
 * Author: Md. Nazmul Islam
 *  Description: Color picker application with huge dom functionalities
 */

// Globals
let toastContainer = null;

// onload hendler
document.addEventListener("DOMContentLoaded", main);

//  main or boot function, this function will take care of getting all the DOM references
function main() {
	const generateRandomColorBtn = document.getElementById(
		"generate_random_color"
	);
	const colorModeHexInp = document.getElementById("input_hex");
	const colorSliderRed = document.getElementById("color_slider_red");
	const colorSliderGreen = document.getElementById("color_slider_green");
	const colorSliderBlue = document.getElementById("color_slider_blue");
	const copyToClipboardBtn = document.getElementById("copy_to_clipboard");
	const colorModeRadios = document.getElementsByName("color-mode");

	// event listener
	generateRandomColorBtn.addEventListener(
		"click",
		handleGenerateRandomColorBtn
	);

	colorModeHexInp.addEventListener("keyup", handleColorModeHexInp);
	colorSliderRed.addEventListener(
		"change",
		handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
	);
	colorSliderGreen.addEventListener(
		"change",
		handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
	);
	colorSliderBlue.addEventListener(
		"change",
		handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue)
	);

	copyToClipboardBtn.addEventListener("click", function () {
		const mode = getCheckedValueFromRadios(colorModeRadios);
		if (mode === null) {
			throw new Error("Invalid Radio Input");
		}

		if (mode === "hex") {
			const hexColor = document.getElementById("input_hex").value;
			navigator.clipboard.writeText(`#${hexColor}`);
		} else {
			const rgbColor = document.getElementById("input_rgb").value;
			navigator.clipboard.writeText(`#${rgbColor}`);
		}
	});

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

function handleColorSliders(colorSliderRed, colorSliderGreen, colorSliderBlue) {
	return function () {
		const color = {
			red: parseInt(colorSliderRed.value),
			green: parseInt(colorSliderGreen.value),
			blue: parseInt(colorSliderBlue.value),
		};
		updateColorCodeToDom(color);
	};
}

// DOM functions
/**
 * Generate a dynamic DOM element to show a toasr message
 * @param {string} msg
 * @returns {void}
 */
function generateToastMessage(msg) {
	toastContainer = document.createElement("div");
	toastContainer.innerText = msg;
	toastContainer.className = "toast-message toast-message-slide-in";

	toastContainer.addEventListener("click", function () {
		toastContainer.classList.remove("toast-message-slide-in");
		toastContainer.classList.add("toast-message-slide-out");

		toastContainer.addEventListener("animationend", function () {
			toastContainer.remove();
			toastContainer = null;
		});
	});

	document.body.appendChild(div);
}

/**
 * find the checked elements from a list of radio buttons
 * @param {Array} nodes
 * @returns {string | null}
 */
// This function isn't clear to me. Let ask Mehedi
function getCheckedValueFromRadios(nodes) {
	let checkedValue = null;
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].checked) {
			checkedValue = nodes[i].value;
			break;
		}
	}
	return checkedValue;
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
