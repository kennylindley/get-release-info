const core = require("@actions/core");
const fs = require("fs");

const matchingRegex = new RegExp(core.getInput("matching_regex", { required: false }));

function run() {
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  let count = 0;
  releaseInfo.release.assets.forEach(asset => {
    // Only get the name if it is a .exe or .dmg
    if (matchingRegex && assets.name.match(matchingRegex)) return;
    count++;
    core.setOutput(`name[${count}]`, asset.name);
    core.setOutput(`url[${count}]`, asset.url);
  });
  core.setOutput("count", count)
  core.setOutput("version", releaseInfo.release.name);
}

run();
