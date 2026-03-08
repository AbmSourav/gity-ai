import { textPrompt } from "../terminalUI/textPrompt.js";
import { generatePrDescription } from "./prDescription/generatePrDescription.js";
import { savePrDescription } from "./prDescription/savePrDescription.js";

export async function prDescription(args) {
	if (args?._[0] !== "prd") {
		return;
	}

	const branchName = textPrompt("Branch Name", "Write name of the branch for which you want to create PR");

	const currentBranchCmd = new Deno.Command("git", {
		args: ["branch", "--show-current"],
		stdout: "piped",
		stderr: "piped",
	});

	const currentBranchOutput = await currentBranchCmd.output();
	const currentBranch = new TextDecoder().decode(currentBranchOutput?.stdout)?.trim();

	const commitListCmd = new Deno.Command("git", {
		args: [
			"log",
			"remotes/origin/" + branchName + '..' + "remotes/origin/" + currentBranch,
			"--no-merges",
		],
		stdout: "piped",
		stderr: "piped",
	});

	const commitListOutput = await commitListCmd.output();
	const commitList = new TextDecoder().decode(commitListOutput?.stdout);

	const prDescription = await generatePrDescription(args, [{
		parts: [
			{
				text: "You are a Software engineer. Write a detail 'Pull Request description' based below commit messages. The description shouldn't be repetitive. Write in Markdown syntext, but don't wrap the entire message in three backticks (```)",
			},
			{
				text: "Follow this format: # Title ## Context\n\n## Description\n\n## Changes in the codebase\n\n",
			},
			{ text: commitList },
		],
	}]);

	await savePrDescription(prDescription);

	Deno.exit(0);
}
