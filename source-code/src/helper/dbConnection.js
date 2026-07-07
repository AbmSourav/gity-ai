import * as path from "jsr:@std/path";

// Store the database in a stable per-user location (~/.gityai)
function gityaiDir() {
	const home = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE");
	return path.join(home, ".gityai");
}

export async function dbConnection() {
	const dir = gityaiDir();
	await Deno.mkdir(dir, { recursive: true });

	const dbPath = path.join(dir, "gityai_db.sqlite3");

	const dbExists = await Deno.stat(dbPath)
		.then((fileInfo) => fileInfo)
		.catch(() => {
			return false;
		});

	if (dbExists?.isFile) {
		return await Deno.openKv(dbPath);
	}

	await Deno.writeTextFile(dbPath);
	return await Deno.openKv(dbPath);
}
