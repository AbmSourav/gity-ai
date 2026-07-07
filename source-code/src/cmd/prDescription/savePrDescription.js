
export async function savePrDescription(prDescription) {
	const prDescriptionFilePath = Deno.cwd() + "/.gityai/pr.md";

	if (prDescription) {
		await Deno.writeFile(
			prDescriptionFilePath,
			new TextEncoder().encode(prDescription),
			{ create: true }
		)
		.finally(() => {
			console.log(
				`\x1b[90m  Pull Request description has been generated and saved in ${prDescriptionFilePath}\n \x1b[0m`,
			);
		});
	}
}
