export function verifyArgs(args, flag = '', alias = "") {
	if (args[alias]) return true

	return args?._[0] === flag ? true : false;
}
