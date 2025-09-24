import { selectPrompt } from "../../terminalUI/selectPrompt.js";

export async function makeCommit(args, commitMessage) {
	const selectedOption = selectPrompt("Select one of below", [
		"* Make Sign Commit with `-S` flag",
		"* Make Commit",
		"* Don't Make Commit"
	]);

	if (selectedOption.trim() === "* Don't Make Commit") {
		Deno.exit(0);
	}

	const filePath = Deno.cwd() + "/.GityAI/cm.md";

	// unsigned commit
	if (selectedOption.trim() === "* Make Commit") {
		if (!args?.s) {
			// unsigned commit without file
			await new Deno.Command("git", {
				args: ["commit", "-am", commitMessage],
				stdout: "inherit",
				stderr: "inherit",
			}).output();

			return;
		}

		// unsigned commit with file
		await new Deno.Command("git", {
			args: ["commit", "-a", "-F", filePath],
			stdout: "inherit",
			stderr: "inherit",
		}).output();

		return;
	}

	// sign commit

	if (!args?.s) {
		// sign commit without file
		await new Deno.Command("git", {
			args: ["commit", "-S", "-am", commitMessage],
			stdout: "inherit",
			stderr: "inherit",
		}).output();

		return;
	}

	// sign commit with file
	await new Deno.Command("git", {
		args: ["commit", "-S", "-a", "-F", filePath],
		stdout: "inherit",
		stderr: "inherit",
	}).output();

	return;
}
