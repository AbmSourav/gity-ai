import { parseArgs } from "jsr:@std/cli/parse-args";

import { help } from "./help.js";
import { version } from "./version.js";
import { setup } from "./setup.js";
import { init } from "./init.js";
import { commitMessage } from "./commitMessage.js";
import { isSetup } from "../helper/isSetup.js";
import { prDescription } from "./prDescription.js";
import { projectInitialized } from "../helper/projectInitialized.js";

export async function command() {
	const args = parseArgs(Deno.args, {
		boolean: ["help"],
		alias: { help: "h", version: "v" },
	});

	// Setup the app
	await setup(args);

	// Check if the user has setup the app before running any other command
	await isSetup(args);

	// initialize GityAI for project
	await init(args);

	// Check if the project is initialized
	await projectInitialized(args);

	// Generate commit message
	await commitMessage(args);

	// Generate PR description
	await prDescription(args);

	// Display version
	version(args);
	// Display help message
	help();
}
