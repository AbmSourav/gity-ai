export function drawBox(rows, label, description = "", fullWidth = false) {
	let boxWidth = parseInt(Deno.consoleSize().columns / 2);

	let topBorderWidth = boxWidth;
	let bottomBorderWidth = boxWidth + label.length + 2;
	if (fullWidth) {
		boxWidth = parseInt(Deno.consoleSize().columns);
		topBorderWidth = boxWidth - label.length - 6;
		bottomBorderWidth = boxWidth - 4;
	}

    // top border
	console.log("\n\x1B[90m┌ " + label + " " + "─".repeat(topBorderWidth) + "┐\x1B[0m");

	// content area
	for (let i = 0; i < rows; i++) {
		console.log(" ");
	}

	// bottom border
	console.log("\x1B[90m└" + "─".repeat(bottomBorderWidth) + "┘\x1B[0m");

	if (description) {
		console.log("\x1B[90m  " + description + "\x1B[0m");
		Deno.stdout.writeSync(new TextEncoder().encode("\x1b[" + (rows + 2) + "A\x1b[2C"));
		return;
	}

	// cursor positioning
	Deno.stdout.writeSync(new TextEncoder().encode("\x1b[" + (rows + 1) + "A\x1b[2C"));
}
