import { findContentInFile } from "../helper/findContentInFile.js";

export async function init(args) {
	if (args?._[0] !== "init" && !args?.i) {
		return;
	}

	const path = Deno.cwd();

	const gitDir = await Deno.stat(path + "/.git").then((dirInfo) => dirInfo).catch((err) => err);
	if (!gitDir?.isDirectory) {
		console.error("%c Error: Git is not initialized. GityAI only works in a git repository.", "color: red");
		Deno.exit(0);
	}

	let hasGityAIDir = await Deno.stat(path + "/.gityai")
		.then((dirInfo) => dirInfo)
		.catch(() => false);

	if (hasGityAIDir?.isDirectory) {
		console.log("\x1b[90m Already initialized\x1b[0m\n");
		Deno.exit(0);
	}

	const hasCommitMessageFile = await Deno.stat(
		path + "/.gityai/cm.md",
	)
		.then((fileInfo) => fileInfo)
		.catch(() => false);

	try {
		if (!hasGityAIDir?.isDirectory) {
			await Deno.mkdir(path + "/.gityai", { recursive: true });
		}
	} catch (err) {
		console.error(`Error creating folder: ${err}`);
	}

	try {
		hasGityAIDir = await Deno.stat(path + "/.gityai")
			.then((dirInfo) => dirInfo)
			.catch(() => false);

		if (hasGityAIDir?.isDirectory && !hasCommitMessageFile?.isFile) {
			const encoder = new TextEncoder();
			await Deno.writeFile(
				path + "/.gityai/cm.md",
				encoder.encode(""),
			);

			const hasGityAiInGitIgnore = await findContentInFile(Deno.cwd() + "/.gitignore", ".gityai");
			if (! hasGityAiInGitIgnore) {
				await Deno.writeTextFile(path + "/.gitignore", "\n.gityai\n", {
					append: true,
				});
			}
		}
	} catch (err) {
		console.error(`Error creating file: ${err}`);
	}

	console.log("%c GityAI Initialized for this project 🎉\n", "color: green");
	Deno.exit(0);
}
