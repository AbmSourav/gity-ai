import { spinner } from "../../terminalUI/spinner.js";
import { HttpClient } from "../../aiClients/httpClient.js";
import { savePrDescription } from "./savePrDescription.js";

export async function generatePrDescription(args, commitList) {
	spinner.start();

	const context = [{
		parts: [
			{
				text: "You are a Software engineer. Write a detail 'Pull Request description' based below commit messages. The description shouldn't be repetitive. Write in Markdown syntext, but don't wrap the entire message in three backticks (```)",
			},
			{
				text: "Follow this format: # Title ## Context\n\n## Description\n\n## Changes in the codebase\n\n",
			},
			{ text: commitList },
		],
	}];

	const httpClient = new HttpClient();

	const req = await httpClient.request(context);
	const prDescription = await httpClient.response(req);

	spinner.stop();

	if (!args?.s) {
		console.log(
			"Pull Request Description: \n \x1b[94m" + prDescription + "\x1b[0m\n",
		);
		console.log(
			"\x1b[90m Pull Request Description generated. Please review above content.\x1b[0m",
		);
		return;
	}

	await savePrDescription(prDescription);

	return prDescription;
}
