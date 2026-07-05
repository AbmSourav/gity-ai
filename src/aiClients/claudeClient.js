import { dbConnection } from "../helper/dbConnection.js";

export async function claudeClient(content) {
	const url = "https://api.anthropic.com/v1/messages";
	const model = "claude-sonnet-5";

	const db = await dbConnection();
	const apiKey = await db.get(["appSetup", "claudeApiKey"]);

	const messages = content.map((entry) => ({
		role: "user",
		content: (entry?.parts ?? []).map((part) => ({
			type: "text",
			text: part.text,
		})),
	}));

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey?.value,
			"anthropic-version": "2023-06-01",
		},
		body: JSON.stringify({
			model,
			max_tokens: 16000,
			messages,
		}),
	});

	return res;
}
