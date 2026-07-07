import { geminiClient } from "./geminiClient.js";
import { claudeClient } from "./claudeClient.js";
import { dbConnection } from "../helper/dbConnection.js";
import { spinner } from "../terminalUI/spinner.js";
import modelEnum from "../helper/modelEnum.js";

export class HttpClient {
	#db;

	constructor() {
		// dbConnection is async, so start connecting now and await the promise
		// inside each method. Callers just `new HttpClient()`.
		this.#db = dbConnection();
	}

	async #selectedModel() {
		const db = await this.#db;
		const selectedModel = await db.get(["model", "selectedModel"]);
		return selectedModel?.value;
	}

	async request(context) {
		if ((await this.#selectedModel()) === modelEnum.gemini.models[0].name) {
			return await geminiClient(context);
		}

		return await claudeClient(context);
	}

	async response(req) {
		if (req?.status !== 200) {
			// Stop the spinner and restore the cursor it hid before exiting,
			// otherwise the user's terminal is left with an invisible cursor.
			spinner.stop();
			console.log("\x1b[?25h");

			console.error(`HTTP Error! Status: ${req.status} \n(${req.statusText})`);

			Deno.exit(0);
		}

		const data = await req.json();

		if ((await this.#selectedModel()) === modelEnum.gemini.models[0].name) {
			return data?.candidates[0]?.content?.parts[0]?.text ?? "";
		}

		return data?.content[1]?.text ?? "";
	}
}
