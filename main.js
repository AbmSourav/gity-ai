import "jsr:@std/dotenv/load";

import { command } from "./src/cmd/command.js";
import { setAppVersion } from "./src/helper/setAppVersion.js";

setAppVersion("1.1.0");
command();
