document.addEventListener("DOMContentLoaded", main);

function main() {
	const root = document.getElementById("root");
	const btn = document.getElementById("change_btn");

	btn.addEventListener("click", function () {
		const suraiya = karimaRGBColor();
		root.style.background = suraiya;
	});
}

function karimaRGBColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);

	return `rgb(${red}, ${green}, ${blue})`;
}
karimaRGBColor();
