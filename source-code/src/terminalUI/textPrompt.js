import { drawBox } from "./drowBox.js";

export function textPrompt(label, description = '', rows = 1, fullWidth = false) {
	drawBox(rows, label, description, fullWidth);

	const input = prompt(" ");

	if (rows > 1) {
		console.log("\x1B[" + (rows - 1) + "B");
		return input;
	}

	console.log("\x1B[1B");
	return input;
}
