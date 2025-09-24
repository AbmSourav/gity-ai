export function setAppVersion(version = "1.0.0") {
	const appVersion = version || "1.0.0";
	Deno.env.set("GITYAI_VERSION", appVersion);

	return appVersion;
}
