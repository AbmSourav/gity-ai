import { textPrompt } from "../../terminalUI/textPrompt.js";
import { generatePrDescription } from "./generatePrDescription.js";

export async function handlePrompt(args, commitList, prDescription) {
	const prompt = textPrompt("Prompt", "Write a prompt to generate the PR description", 4, true);

	// No feedback given — keep the current description and let the loop continue.
	if (!prompt) {
		return prDescription;
	}

	console.log("\n");

	const data = await generatePrDescription(
		args,
		"commit messages: " + commitList +
			"\n\nlatest generated PR description: " + prDescription +
			"\n\n" + prompt,
	);

	return data;
}
