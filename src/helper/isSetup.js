import { help } from "../cmd/help.js";
import { dbConnection } from "./dbConnection.js";

export async function isSetup(args) {
	const db = await dbConnection();
	const geminiApiKey = await db.get(["appSetup", "geminiApiKey"]);
	const claudeApiKey = await db.get(["appSetup", "claudeApiKey"]);

	if (
		!geminiApiKey?.value &&
		!claudeApiKey?.value &&
		(!args?.version || !args?.v) &&
		args?._[0] !== 'help' &&
		!args?.h
	) {
		console.log("%c\n  Please setup GityAI", "color: red");
		help();
		Deno.exit(0);
	}
}
