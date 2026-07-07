const fs = require("node:fs");
const path = require("node:path");
const AdmZip = require("adm-zip");

const REPO = "AbmSourav/gity-ai";
const TAG = "2.1";

// Map Node's `${platform}-${arch}` → the release asset target triple
const TARGETS = {
	"linux-x64": "linux-x86_64",
	"linux-arm64": "linux-aarch64",
	"darwin-arm64": "mac-aarch64",
	"win32-x64": "windows-x86_64",
};

function resolveTarget() {
	const key = `${process.platform}-${process.arch}`;
	const target = TARGETS[key];

	if (!target) {
		const supported = Object.keys(TARGETS).join(", ");
		throw new Error(
			`unsupported platform: ${key}\n` +
				`Supported platforms: ${supported}.\n` +
				`Download a binary manually from https://github.com/${REPO}/releases`,
		);
	}

	const ext = process.platform === "win32" ? ".exe" : "";
	return { target, ext };
}

// Cache location for the downloaded binary — resolved relative to THIS file,
// never the current working directory, so global and per-project installs both
// find the binary sitting next to the package.
function binaryPath() {
	const { ext } = resolveTarget();
	return path.join(__dirname, "..", "vendor", `gityai-binary${ext}`);
}

async function download({ force = false } = {}) {
	const dest = binaryPath();

	// Idempotent: reuse an already-downloaded binary unless forced.
	if (!force && fs.existsSync(dest)) {
		return dest;
	}

	const { target, ext } = resolveTarget();
	const asset = `${target}.zip`;
	const url = `https://github.com/${REPO}/releases/download/${TAG}/${asset}`;

	const vendorDir = path.dirname(dest);	// packageRoot/vendor
	fs.mkdirSync(vendorDir, { recursive: true });

	console.log(`GityAI: downloading ${asset}...`);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`download failed: ${res.status}`);

	// Read the zip into memory and unzip it with a pure-JS library — no OS
	// `unzip`/`tar` dependency, so install works in minimal environments.
	const zipBuffer = Buffer.from(await res.arrayBuffer());
	const zip = new AdmZip(zipBuffer);

	// The binary is nested inside the archive at `<target>/gityai`.
	const entryName = `${target}/gityai${ext}`;
	const entry = zip.getEntry(entryName);
	if (!entry) {
		throw new Error(`binary not found in archive at ${entryName}`);
	}
	const binaryData = zip.readFile(entry);
	if (!binaryData) {
		throw new Error(`failed to read ${entryName} from archive`);
	}

	// Install atomically: write to a temp path in vendor/, then rename over the
	// final path so an interrupted write never leaves a partial binary.
	const stagePath = `${dest}.download`;
	fs.rmSync(stagePath, { force: true });	// cleanup from previous failed download
	fs.writeFileSync(stagePath, binaryData);

	if (process.platform !== "win32") fs.chmodSync(stagePath, 0o755);

	fs.rmSync(dest, { force: true });	// cleanup from previous version (if any)
	fs.renameSync(stagePath, dest);

	return dest;
}

module.exports = { REPO, TAG, TARGETS, resolveTarget, binaryPath, download };
