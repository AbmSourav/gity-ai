const { download } = require("../lib/download");

// postinstall: prefetch the binary for the user's platform.
download({ force: false })
	.then(() => {
		console.log("GityAI: installed.");
	})
	.catch((err) => {
		console.warn(
			`GityAI: could not prefetch the binary (${err.message}).\n` +
				`It will be downloaded automatically the first time you run \`gityai\`.`,
		);
		process.exit(0);
	});
