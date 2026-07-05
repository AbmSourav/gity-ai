import { dbConnection } from "../helper/dbConnection.js";
import modelEnum from "../helper/modelEnum.js";
import { selectPrompt } from "../terminalUI/selectPrompt.js";
import { drawBox } from "../terminalUI/drowBox.js";

export async function model(args) {
	if (args?._[0] !== "model") {
		return;
	}

	const db = await dbConnection();
	const models = await db.getMany([
		["appSetup", "geminiApiKey"],
		["appSetup", "claudeApiKey"]
	]);

	let modelNames = [];

	for await (const model of models) {
		if (model?.value) {
			if (model?.key[1] === "geminiApiKey") {
				modelNames.push(modelEnum.gemini.models[0].name);
			} else if (model?.key[1] === "claudeApiKey") {
				modelNames.push(modelEnum.claude.models[0].name);
			}
		}
	}

	if (args?.a) {
		const selectedModel = await db.get(["model", "selectedModel"]);

		let list = []
		modelNames.forEach((modelName) => {
			const label = (modelName === modelEnum.gemini.models[0].name) ? modelEnum.gemini.models[0].label : modelEnum.claude.models[0].label
			let space = ""
			if (modelName === selectedModel?.value) {
				space = (modelName === modelEnum.gemini.models[0].name) ? " " : "  ";
				return list.push(`${space}* ${label} (active)`);
			}

			space = (modelName === modelEnum.claude.models[0].name) ? "   " : "";
			list.push(`${space}* ${label}`);
		});

		drawBox(2, "Available Model");
		const content = list.join("\n");
		console.log(content);
		console.log("\n\x1b[?25h");

		Deno.exit(0);
	}

	if (modelNames.length === 1) {
		const modelName = modelNames[0] === modelEnum.gemini.models[0].name ? modelEnum.gemini.models[0].label : modelEnum.claude.models[0].label;
		drawBox(2, "Selected Model");
		console.log("%c\n  * %s (active)\n", "color: gray", modelName);
	} else {
		const selectedModel = await selectPrompt("Select which model to use", [
			"* " + modelEnum.gemini.models[0].label,
			"* " + modelEnum.claude.models[0].label,
		]);

		await db.set(["model", "selectedModel"], selectedModel.trim() === ("* " + modelEnum.gemini.models[0].label) ? modelEnum.gemini.models[0].name : modelEnum.claude.models[0].name);
	}

	Deno.exit(0);
}
