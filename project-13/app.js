/**
 *  Date: 02-10-2025
 * Author: Md. Nazmul Islam
 *  Description: Color picker application with huge dom functionalities
 */

// Globals
let toastContainer = null;

const defaultColor = {
	red: 221,
	green: 222,
	blue: 238,
};

const defaultPresetColors = [
	"#ffcdd2",
	"#f8bbd0",
	"#e1bee7",
	"#ff8a80",
	"#ff80ab",
	"#ea80fc",
	"#b39ddb",
	"#9fa8da",
	"#90caf9",
	"#b388ff",
	"#8c9eff",
	"#82b1ff",
	"#03a9f4",
	"#00bcd4",
	"#009688",
	"#80d8ff",
	"#84ffff",
	"#a7ffeb",
	"#c8e6c9",
	"#dcedc8",
	"#f0f4c3",
	"#b9f6ca",
	"#ccff90",
	"#ffcc80",
];
let customColors = new Array(24);
const copySound = new Audio("/project-11/copy-sound.wav");

// onload hendler
document.addEventListener("DOMContentLoaded", () => {
	main();
	updateColorCodeToDom(defaultColor);
	// displlay preset colors
	displayColorBoxes(
		document.getElementById("preset_colors"),
		defaultPresetColors
	);
	const customColorsString = localStorage.getItem("custom_colors");
	if (customColorsString) {
		customColors = JSON.parse(customColorsString);
		displayColorBoxes(
			document.getElementById("custom_colors"),
			customColors
		);
	}
});

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
	const saveToCustomBtn = document.getElementById("save_to_custom");
	const presetColorsParent = document.getElementById("preset_colors");
	const customColorsParent = document.getElementById("custom_colors");

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

	copyToClipboardBtn.addEventListener("click", handleCopyToClipboard);
	presetColorsParent.addEventListener("click", handlePresetColorsParent);
	saveToCustomBtn.addEventListener(
		"click",
		handleSaveToCustomBtn(customColorsParent, colorModeHexInp)
	);
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

function handleCopyToClipboard() {
	const colorModeRadios = document.getElementsByName("color-mode");
	const mode = getCheckedValueFromRadios(colorModeRadios);
	if (mode === null) {
		throw new Error("Invalid Radio Input");
	}

	if (toastContainer !== null) {
		toastContainer.remove();
		toastContainer = null;
	}

	if (mode === "hex") {
		const hexColor = document.getElementById("input_hex").value;
		if (hexColor && isValidHex(hexColor)) {
			navigator.clipboard.writeText(`#${hexColor}`);
			generateToastMessage(`#${hexColor} Copied`);
		} else {
			alert("Invalid Hex Code");
		}
	} else {
		const rgbColor = document.getElementById("input_rgb").value;
		if (rgbColor) {
			navigator.clipboard.writeText(`#${rgbColor}`);
			generateToastMessage(`${rgbColor} Copied`);
		} else {
			alert("Invalid RGB Color");
		}
	}
}

function handlePresetColorsParent(event) {
	const child = event.target;
	if (child.className === "color-box") {
		navigator.clipboard.writeText(child.getAttribute("data-color"));
		copySound.volume = 0.2;
		copySound.play();
	}
}

function handleSaveToCustomBtn(customColorsParent, inputHex) {
	return function () {
		const color = `#${inputHex.value}`;
		if (customColors.includes(color)) {
			alert(`Already in your list`);
			return;
		}
		customColors.unshift(color);
		if (customColors.length > 24) {
			customColors = customColors.slice(0, 24);
		}
		localStorage.setItem(`custom_colors`, JSON.stringify(customColors));
		removeChildren(customColorsParent);
		displayColorBoxes(customColorsParent, customColors);
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

	document.body.appendChild(toastContainer);
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

/**
 * create a div element with class name of color-box
 * @param {string} color
 * @returns {object}
 */
function generateColorBox(color) {
	const div = document.createElement("div");
	div.className = "color-box";
	div.style.backgroundColor = color;
	div.setAttribute("data-color", color);

	return div;
}

/**
 * this function will create and append new color boxes to it's parent
 * @param {object} parent
 * @param {Array} colors
 */
function displayColorBoxes(parent, colors) {
	colors.forEach((color) => {
		if (isValidHex(color.slice(1))) {
			const colorBox = generateColorBox(color);
			parent.appendChild(colorBox);
		}
	});
}

/**
 * remove all children from parent
 * @param {object} parent
 */
function removeChildren(parent) {
	let child = parent.lastElementChild;
	while (child) {
		parent.removeChild(child);
		child = parent.lastElementChild;
	}
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
