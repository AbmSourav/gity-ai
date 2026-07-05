import { textPrompt } from "../terminalUI/textPrompt.js";
import { selectPrompt } from "../terminalUI/selectPrompt.js";
import { generatePrDescription } from "./prDescription/generatePrDescription.js";
import { handlePrompt } from "./prDescription/handlePrompt.js";
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

	// test data start
	// const gitDiff = new Deno.Command("git", {
	// 	args: ["diff"],
	// 	stdout: "piped",
	// 	stderr: "piped",
	// });

	// const { stdout } = await gitDiff.output();
	// const commitList = new TextDecoder().decode(stdout);
	// test data end

	let prDescription = await generatePrDescription(args, commitList);

	// Keep refining until the user is happy with the generated description.
	while (true) {
		const selectedOption = selectPrompt("Select one of below", [
			"* Happy with it",
			"* Generate another one",
			"* My prompt",
		]);

		if (selectedOption.trim() === "* Generate another one") {
			prDescription = await generatePrDescription(args, commitList);
		} else if (selectedOption.trim() === "* My prompt") {
			prDescription = await handlePrompt(args, commitList, prDescription);
		} else {
			break;
		}
	}

	Deno.exit(0);
}
