export function version(args) {
	if (args?._[0] !== "version" && !args?.v) {
		return;
	}

	const appVersion = Deno.env.get("GITYAI_VERSION");

	console.log(
		`
  %cGityAI version: ${appVersion}
  GityAI is a agentic AI tool that can automate Git workflows.
  `,
		"color: green",
	);

	console.log(
		`
  %cDeveloped with 🧡 by Keramot <keramotul.islam@gmail.com>
  `,
		"color: gray",
	);

	Deno.exit(0);
}
