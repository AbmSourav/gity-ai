import { spinner } from "../../terminalUI/spinner.js";
import { saveCommitMessage } from "./saveCommitMessage.js";
import { HttpClient } from "../../aiClients/httpClient.js";

export async function generateCommitMessage(args, context = []) {
	spinner.start();

	const httpClient = new HttpClient();

	const defaultContext = [{
		parts: [
			{
				text: "You are a Senior Software engineer. Write a detail Git commit message based on the changes. The message shouldn't be repetitive. Write in Markdown syntext, but don't wrap the entire message in three backticks (```). 'Aditional information' section is option and also should be minimal",
			},
			{
				text: "Follow this format: # feat/fix/refactor/enhancement/docs/style/test/perf/ci/build/revert: title\n\n ## Description\n\n## Changes in the codebase\n\n## Aditional information\n\n",
			},
			...context,
		],
	}];

	const req = await httpClient.request(defaultContext);
	const commitMessage = await httpClient.response(req);

	spinner.stop();

	if (!args?.s) {
		console.log(
			"Commit Message: \n \x1b[94m" + commitMessage + "\x1b[0m\n",
		);
		console.log(
			"\x1b[90m Commit Message generated. Please review above content.\x1b[0m",
		);
		return;
	}

	await saveCommitMessage(args, commitMessage);

	return commitMessage;
}
