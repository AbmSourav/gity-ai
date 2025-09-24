import * as path from "jsr:@std/path";

export async function dbConnection() {
	const rootDir = path.dirname(Deno.execPath());
	const dbPath = rootDir + "/gityai_db.sqlite3";

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
