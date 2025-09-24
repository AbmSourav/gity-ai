export async function findContentInFile(path, content, inline = false) {
	try {
		const stat = await Deno.stat(path).then((dirInfo) => dirInfo).catch((err) => err);

		// file does not exist
		if (!stat?.isFile) {
			return false;
		}

		// Read file
		const fileContent = await Deno.readTextFile(path);

		// Check if a portion of a line contains the content
		if (inline) {
			let hasContent = false;
			for (const line of fileContent.split("\n")) {
				if (line.search(content) !== -1) {
					if (line.indexOf("#") === 0) {
						continue;
					}
					hasContent = true;
					break;
				}
			}

			return hasContent;
		}

		// // Split lines and trim spaces
		const lines = fileContent.split("\n").map(line => line.trim());

		return lines.includes(content);
	} catch (error) {
		console.error("Error:", error.message);
	}
}
