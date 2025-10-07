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
			kilometer: "Kilometer",
			meter: "Meter",
			centimeter: "Centimeter",
			millimeter: "Millimeter",
			mile: "Mile",
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

let lastLeftSelectedValue = "";
let lastRightSelectedValue = "";

function main() {
	const categorySelect = document.getElementById("category_select");
	const leftSelect = document.getElementById("left_select");
	const rightSelect = document.getElementById("right_select");

	const converterKeys = Object.keys(converter).sort();
	removeAllChild(categorySelect);
	converterKeys.forEach((item) => {
		addOption(categorySelect, { value: item, text: converter[item].name });
	});

	// set default category units
	updateCategoryChanges(categorySelect, leftSelect, rightSelect);

	categorySelect.addEventListener("change", function () {
		updateCategoryChanges(categorySelect, leftSelect, rightSelect);
	});

	leftSelect.addEventListener("change", function (event) {
		if (event.target.value === rightSelect.value) {
			const options = rightSelect.getElementsByTagName("option");

			// It's not clear to me ask Mehedi
			for (let i = 0; i < options.length; i++) {
				if (lastLeftSelectedValue === options[i].value) {
					options[i].selected = "selected";
					lastRightSelectedValue = options[i].value;
					break;
				}
			}
		}
		lastLeftSelectedValue = event.target.value;
	});

	rightSelect.addEventListener("change", function (event) {
		if (event.target.value === leftSelect.value) {
			const options = leftSelect.getElementsByTagName("option");
			for (let i = 0; i < options.length; i++) {
				if (lastRightSelectedValue === options[i].value) {
					options[i].selected = "selected";
					lastLeftSelectedValue = options[i].value;
					break;
				}
			}
		}
		lastRightSelectedValue = event.target.value;
	});
}

function addOption(parent, option) {
	const opt = document.createElement("option");
	opt.setAttribute("value", option.value);
	opt.innerText = option.text;

	parent.appendChild(opt);
}

function removeAllChild(parent) {
	while (parent.firstChild) {
		parent.firstChild.remove();
	}
}

function updateCategoryChanges(categorySelect, leftSelect, rightSelect) {
	const converterName = categorySelect.value;
	const units = converter[converterName].units;
	const options = Object.keys(units).sort();

	// handle left select
	removeAllChild(leftSelect);

	options.forEach((item) => {
		addOption(leftSelect, { value: item, text: units[item] });
	});
	lastLeftSelectedValue = leftSelect.value;

	// handle right select
	removeAllChild(rightSelect);

	options.forEach((item) => {
		addOption(rightSelect, { value: item, text: units[item] });
	});

	rightSelect.value = options[1];
	lastRightSelectedValue = rightSelect.value;
}
