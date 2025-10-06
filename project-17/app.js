document.addEventListener("DOMContentLoaded", main());

function main() {
	const submitBtn = document.getElementById("submit_btn");
	const resetBtn = document.getElementById("reset_btn");
	const nameInp = document.getElementById("name_inp");
	const nameOutput = document.getElementById("name_output");
	const resultBody = document.getElementById("result_body");

	resultBody.style.display = "none";

	resetBtn.addEventListener("click", function () {
		nameInp.value = "";
		resultBody.style.display = "none";
	});

	submitBtn.addEventListener("click", function () {
		const name = nameInp.value;

		if (!name) {
			alert("Please provide  a valid name");
		} else {
			resultBody.style.display = "block";
			nameOutput.innerHTML = name;
			nameInp.value = "";
		}
	});
}
