import { selectPrompt } from "../terminalUI/selectPrompt.js";
import { generateCommitMessage } from "./commitMessage/generateCommitMessage.js";
import { handlePrompt } from "./commitMessage/handlePrompt.js";
import { makeCommit } from "./commitMessage/makeCommit.js";

export async function commitMessage(args) {
	if (args?._[0] !== "cm") {
		return;
	}

	const gitDiff = new Deno.Command("git", {
		args: ["diff"],
		stdout: "piped",
		stderr: "piped",
	});

	const { stdout } = await gitDiff.output();
	const diff = new TextDecoder().decode(stdout);

	if (!diff) {
		console.error("%c  No changes found to commit\n", "color: red");
		return;
	}

	const context = [{text: diff }];
	let commitMessage = await generateCommitMessage(args, context);

	const selectedOption = selectPrompt("Select one of below", [
		"* Happy with it",
		"* Generate another one",
		"* My prompt",
	]);

	if (selectedOption.trim() === "* Generate another one") {
		commitMessage = await generateCommitMessage(args, context);
	} else if (selectedOption.trim() === "* My prompt") {
		await handlePrompt(args, diff, commitMessage);
		Deno.exit(0);
	}

	await makeCommit(args, commitMessage);

	Deno.exit(0);
}
