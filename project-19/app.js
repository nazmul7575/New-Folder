document.addEventListener("DOMContentLoaded", main);

const converter = {
	area: {
		name: "Area",
	},
	mass: {
		name: "Mass",
	},
	length: {
		name: "Length",
	},
	volume: {
		name: "Volume",
	},
	time: {
		name: "Time",
	},
	DataTransferRate: {
		name: "Data Transfer Rate",
	},
};

function main() {
	const categorySelect = document.getElementById("category_select");
}

function addOption(parent, option) {
	const opt = document.createElement("option");
	opt.setAttribute("value", option.value);
	opt.innerText = option.text;

	parent.appendChild(opt);
}
