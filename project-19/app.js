document.addEventListener("DOMContentLoaded", main);

const converter = {
	area: {
		name: "Area",
		units: {
			squareKm: "Square Kilometer",
			squareM: "Square Meter",
			squareMile: "Square Mile",
			squareYard: "Square Yard",
			squareFoot: "Square Foot",
		},
	},
	mass: {
		name: "Mass",
		units: {
			tonne: "Tonne",
			kilogram: "Kilogram",
			gram: "Gram",
			miligram: "Miligram",
		},
	},
	length: {
		name: "Length",
		units: {
			squareM: "Square Meter",
			kilometer: "Kilometer",
			meter: "Meter",
			centimeter: "Centimeter",
			millimeter: "Millimeter",
		},
	},
	time: {
		name: "Time",
		units: {
			second: "Second",
			minute: "Minute",
			hour: "Hour",
			day: "Day",
		},
	},
};

function main() {
	const categorySelect = document.getElementById("category_select");
	const leftSelect = document.getElementById("left_select");
	const rightSelect = document.getElementById("right_select");

	const converterKeys = Object.keys(converter).sort();
	removeAllChild(categorySelect);
	converterKeys.forEach((item) => {
		addOption(categorySelect, { value: item, text: converter[item].name });
	});

	categorySelect.addEventListener("change", function () {
		const converterName = categorySelect.value;
		const units = converter[converterName].units;

		// handle left select
		removeAllChild(leftSelect);
		const leftOptions = Object.keys(units);
		leftOptions.forEach((item) => {
			addOption(leftSelect, { value: item, text: units[item] });
		});

		// handle right select
		removeAllChild(rightSelect);
		const rightOptions = Object.keys(units);
		rightOptions.forEach((item) => {
			addOption(rightSelect, { value: item, text: units[item] });
		});

		rightSelect.value = rightOptions[1];
	});

	const converterName = categorySelect.value;
	const units = converter[converterName].units;

	// handle left select
	removeAllChild(leftSelect);
	const leftOptions = Object.keys(units);
	leftOptions.forEach((item) => {
		addOption(leftSelect, { value: item, text: units[item] });
	});

	// handle right select
	removeAllChild(rightSelect);
	const rightOptions = Object.keys(units);
	rightOptions.forEach((item) => {
		addOption(rightSelect, { value: item, text: units[item] });
	});

	rightSelect.value = rightOptions[1];
	console.log(rightOptions[1]);
}

function addOption(parent, option) {
	const opt = document.createElement("option");
	opt.setAttribute("value", option.value);
	opt.innerText = option.text;

	parent.appendChild(opt);
}

function removeAllChild(parent) {
	while (parent.firstChild) {
		{
			parent.firstChild.remove();
		}
	}
}
