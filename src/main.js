const core = require("@actions/core");
const fs = require("fs");

const matchingRegex = new RegExp(core.getInput("matching_regex", { required: false }));

function run() {
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));

  releaseInfo.release.assets.forEach(asset => {
    // Only get the name if it is a .exe or .dmg
    if (matchingRegex && assets.name.match(matchingRegex)) return;
    core.setOutput("name", asset.name);
    core.setOutput("url", asset.url);
  });
  core.setOutput("version", releaseInfo.release.name);
}

run();
