import { help } from "../cmd/help.js";
import { dbConnection } from "./dbConnection.js";
import { verifyArgs } from "./verifyArgs.js";

export async function isSetup(args) {
	// version/help are read-only — return before opening the DB
	if (
		verifyArgs(args, "version") || verifyArgs(args, 'help') ||
		verifyArgs(args, '', 'h') || verifyArgs(args, '', 'v')
	) {
		return;
	}

	const db = await dbConnection();
	const geminiApiKey = await db.get(["appSetup", "geminiApiKey"]);
	const claudeApiKey = await db.get(["appSetup", "claudeApiKey"]);

	if (
		!geminiApiKey?.value &&
		!claudeApiKey?.value &&
		(!verifyArgs(args, "version") || !verifyArgs(args, '', 'h')) &&
		!verifyArgs(args, 'help') &&
		!verifyArgs(args, '', 'h')
	) {
		console.log("%c\n  Please setup GityAI", "color: red");
		help();
		Deno.exit(0);
	}
}
