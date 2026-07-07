import { dbConnection } from "../helper/dbConnection.js";
import { textPrompt } from "../terminalUI/textPrompt.js";
import { selectPrompt } from "../terminalUI/selectPrompt.js";
import modelEnum from "../helper/modelEnum.js";
import { verifyArgs } from "../helper/verifyArgs.js";

async function getProviderApiKey(props) {
	const title = props?.title || "Set Gemini AI API Key";
	const description = props?.description || "GityAI uses Gemini AI, you need to set a API key to use it.";
	const errorMessage = props?.errorMessage || "%c\nGityAI uses Gemini AI.\nGenerate API key from: https://aistudio.google.com/apikey\nThen please run `GityAI setup` again and provide a the API key.\n";

	const apiKey = await textPrompt(title, description, 1, true);

	if (!apiKey) {
		return console.error(
			errorMessage,
			"color: red",
		);
	}

	return apiKey;
}

async function setApiKey(apiKey, provider) {
	const db = await dbConnection();
	const isGemini = provider.trim() === "* " + modelEnum.gemini.provider;

	if (isGemini) {
		await db.set(["appSetup", "geminiApiKey"], apiKey);
		return;
	}

	await db.set(["appSetup", "claudeApiKey"], apiKey);
	await db.set(["model", "selectedModel"], isGemini ? modelEnum.gemini.models[0].name : modelEnum.claude.models[0].name);
}

export async function setup(args, exit = true) {
	if (!verifyArgs(args, 'setup')) {
		return;
	}

	let apiKey = ''

	const selectedOption = await selectPrompt("Select one of below", [
		"* " + modelEnum.gemini.provider,
		"* " + modelEnum.claude.provider,
	]);

	if (selectedOption.trim() === "* " + modelEnum.claude.provider) {
		apiKey = await getProviderApiKey({
			title: "Set Claude AI API Key",
			description: "GityAI uses Claude, set an API key to use it.",
			errorMessage: "%c\nGityAI uses Claude AI.\nGenerate API key from: https://platform.claude.com/settings/keys\nThen please run `GityAI setup` again and provide a the API key.\n",
		});
	} else {
		apiKey = await getProviderApiKey({
			title: "Set Gemini AI API Key",
			description: "GityAI uses Gemini AI, set an API key to use it.",
			errorMessage: "%c\nGityAI uses Gemini AI.\nGenerate API key from: https://aistudio.google.com/apikey\nThen please run `GityAI setup` again and provide a the API key.\n",
		});
	}

	if (!apiKey) {
		Deno.exit(1);
	}

	await setApiKey(apiKey, selectedOption);

	console.log("%c\n GityAI has been configured\n", "color: green");

	if (exit) {
		Deno.exit(0);
	}
}
