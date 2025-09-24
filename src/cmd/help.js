export function help() {
	console.log(
		`%c
  GityAI is a agentic AI tool that can automate Git workflows.
  Usage: gityai [command] [options]

  Commands:
	setup		Setup GityAI with Gemini API Key
	init, -i	Initialize GityAI for project

	cm -s		Generate commit message and save in markdown file
	cm		Generate commit message
	prd -s		Generate Pull Request description and save in markdown file
	prd		Generate Pull Request description

	help, -h	Display this help message
	version, -v	Display the version of GityAI\n`,
		"color: gray",
	);

	Deno.exit(0);
}
