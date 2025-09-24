import { textPrompt } from "../../terminalUI/textPrompt.js";
import { generateCommitMessage } from "./generateCommitMessage.js";
import { makeCommit } from "./makeCommit.js";

export async function handlePrompt(args, diff, commitMessage) {
	const prompt = textPrompt("Prompt", "Write a prompt to generate the commit message", 4, true);

	if (!prompt) {
		return;
	}

	console.log("\n");

	const data = await generateCommitMessage(args, [
		{ text: "latest code changes: " + diff },
		{ text: "first generated commit message: " + commitMessage },
		{ text: prompt },
	]);

	await makeCommit(args, data);

	return data;
}
