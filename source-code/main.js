import "jsr:@std/dotenv/load";

import { command } from "./src/cmd/command.js";
import { setAppVersion } from "./src/helper/setAppVersion.js";

setAppVersion("2.1");
command();
