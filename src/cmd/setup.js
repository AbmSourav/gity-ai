import { dbConnection } from "../helper/dbConnection.js";
import { textPrompt } from "../terminalUI/textPrompt.js";

export async function setup(args, exit = true) {
	if (args?._[0] !== "setup") {
		return;
	}

	const apiKey = textPrompt("Set Gemini AI API Key", "GityAI uses Gemini AI, you need to set a API key to use it.");

	if (!apiKey) {
		return console.error(
			"%c\nGityAI uses Gemini AI.\nGenerate API key from: https://aistudio.google.com/apikey\nThen please run `GityAI setup` again and provide a the API key.\n",
			"color: red",
		);
	}

	const db = await dbConnection();
	await db.set(["appSetup", "geminiApiKey"], apiKey);

	console.log("%c\n GityAI has been configured\n", "color: green");

	if (exit) {
		Deno.exit(0);
	}
}
