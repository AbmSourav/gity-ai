import { geminiClient } from "../../aiClients/geminiClient.js";
import { spinner } from "../../terminalUI/spinner.js";

export async function generatePrDescription(args, context = []) {
	spinner.start();

	const res = await geminiClient(context);

	spinner.stop();

	if (res?.status !== 200) {
		return console.error(await res?.error());
	}

	const data = await res.json();

	const prDescription = data?.candidates[0]?.content?.parts[0]?.text ?? "";

	if (!args?.s) {
		console.log(
			"Pull Request Description: \n \x1b[94m" + prDescription + "\x1b[0m\n",
		);
		console.log(
			"\x1b[90m Pull Request Description generated. Please review above content.\x1b[0m",
		);
	}

	return prDescription;
}
