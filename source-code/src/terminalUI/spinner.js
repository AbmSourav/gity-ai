export const spinner = {
	loading: false,
	start: function () {
		if (this.loading) {
			return;
		}

		console.log("\x1b[?25l");

		let spinner = "";
		let count = 0;

		console.log("\n");
		this.loading = setInterval(() => {
			if (count === 10) {
				spinner = "";
				count = 0;
				console.log("\x1b[1A \x1b[2K\r");
			}

			console.log("\x1b[1A \x1b[90mProcessing " + spinner + "\x1b[0m");
			spinner += ".";
			count++;
		}, 50);
	},
	stop: function () {
		clearInterval(this.loading);
		this.loading = false;
		console.log("\x1b[?25h \x1b[1A \x1b[2K\r");
	},
};
