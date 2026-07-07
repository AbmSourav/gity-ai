#!/usr/bin/env node
const fs = require("node:fs");
const { spawn } = require("node:child_process");
const { binaryPath, download } = require("../lib/download");

async function main() {
	let bin;

	try {
		bin = binaryPath();
	} catch (err) {
		// Unsupported platform — resolveTarget() threw.
		console.error(err.message);
		process.exit(1);
	}

	// Lazy fallback: if postinstall was skipped (--ignore-scripts) or failed,
	// fetch the binary now before running.
	if (!fs.existsSync(bin)) {
		console.error("GityAI: fetching binary (first run)...");
		try {
			await download({ force: false });
		} catch (err) {
			console.error(`GityAI: failed to download the binary — ${err.message}`);
			process.exit(1);
		}
	}

	// GityAI is interactive (prompts, spinner, cursor control), so inherit stdio
	// to give the child a real TTY.
	const child = spawn(bin, process.argv.slice(2), { stdio: "inherit" });

	// Forward termination signals so Ctrl-C during a prompt reaches the child.
	const forward = (signal) => {
		if (!child.killed) child.kill(signal);
	};
	process.on("SIGINT", forward);
	process.on("SIGTERM", forward);

	child.on("error", (err) => {
		console.error(`GityAI: failed to start — ${err.message}`);
		process.exit(1);
	});

	child.on("exit", (code, signal) => {
		process.exit(code ?? (signal ? 1 : 0));
	});
}

main();
