const core = require("@actions/core");
const fs = require("fs");

function run() {
  core.info(JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")));
}

run();
