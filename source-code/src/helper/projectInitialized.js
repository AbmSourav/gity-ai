import { help } from "../cmd/help.js";

export async function projectInitialized(args) {
	if (
		Object.keys(args)?.length === 3 &&
		!args?._.length &&
		!args?.h &&
		!args?.help
	) {
		return;
	}

	if (
		args?._[0] === "help" || args?.h ||
		args?._[0] === "version" || args?.v
	) {
		return;
	}

	const isInitialized = await Deno.stat(Deno.cwd() + "/.gityai")
		.then((folderInfo) => folderInfo)
		.catch(() => false);

	if (!isInitialized) {
		console.log(
			"%c\n  Please initialize GityAI for this project",
			"color: red",
		);
		help();
		Deno.exit(0);
	}
}
