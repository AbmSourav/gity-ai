import { dbConnection } from "../helper/dbConnection.js";

export async function geminiClient(content) {
	const url = "https://generativelanguage.googleapis.com/v1beta";
	const model = "/models/gemini-2.5-flash";
	const type = ":generateContent";

	const kv = await dbConnection();
	const apiKey = await kv.get(["appSetup", "geminiApiKey"]);

	const reqUrl = url + model + type + "?key=" + apiKey?.value;

	const res = await fetch(reqUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			contents: content,
			generationConfig: {
				"top_p": 0.7,
				"top_k": 10,
				"temperature": 1.8,
			},
		}),
	});

	return res;
}
