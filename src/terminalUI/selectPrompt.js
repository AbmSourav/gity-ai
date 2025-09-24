import { promptSelect } from "jsr:@std/cli/unstable-prompt-select";

export function selectPrompt(label, options) {
	const boxWidth = Deno.consoleSize().columns / 2;
	const widthWithLabel = boxWidth + label.length + 2;

	// top border
	console.log(
		"\n\x1B[90m┌ " + label + " " + "─".repeat(boxWidth) + "┐\x1B[0m",
	);

	// both sides border
	options.forEach(() => {
		console.log(
			"\x1B[90m│" + " ".repeat(widthWithLabel) + "\x1B[90m│\x1B[0m",
		);
	});
	console.log("\x1B[90m│" + " ".repeat(widthWithLabel) + "\x1B[90m│\x1B[0m");
	console.log("\x1B[90m│" + " ".repeat(widthWithLabel) + "\x1B[90m│\x1B[0m");

	// bottom border
	console.log("\x1B[90m└" + "─".repeat(widthWithLabel) + "┘\x1B[0m");

	// cursor positioning
	console.log("\x1b[7A");
	const selectedItem = promptSelect("\x1b[4G ", options, { clear: true });

	// after selection show the selected item in box

	console.log("\x1b[1A");
	options.forEach((option) => {
		const rightSideBorderLength = widthWithLabel - option.length - 1;

		if (option === selectedItem) {
			console.log(
				"\x1B[90m│" + "\x1b[94m \x1b[3G" + option +
					" ".repeat(rightSideBorderLength) + "\x1B[90m│\x1B[0m",
			);
			return;
		} else {
			console.log(
				"\x1B[90m│\x1b[3G" + option +
					" ".repeat(rightSideBorderLength) + "\x1B[90m│\x1B[0m",
			);
		}
	});

	// bottom border
	console.log("\x1B[90m└" + "─".repeat(widthWithLabel) + "┘\x1B[0m");

	// console.log(selectedItem);
	console.log("\x1B[1B");

	return selectedItem;
}
