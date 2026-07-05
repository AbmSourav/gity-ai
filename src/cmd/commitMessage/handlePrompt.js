import { textPrompt } from "../../terminalUI/textPrompt.js";
import { generateCommitMessage } from "./generateCommitMessage.js";

export async function handlePrompt(args, diff, commitMessage) {
	const prompt = textPrompt("Prompt", "Write a prompt to update the commit message", 4, true);

	// No feedback given — keep the current message and let the loop continue.
	if (!prompt) {
		return commitMessage;
	}

	console.log("\n");

	const data = await generateCommitMessage(args, [
		{ text: "latest code changes: " + diff },
		{ text: "latest generated commit message: " + commitMessage },
		{ text: prompt },
	]);

	return data;
}
