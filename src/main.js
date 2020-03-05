const core = require("@actions/core");
const fs = require("fs");

function run() {
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));

  releaseInfo.release.assets.forEach(asset => {
    core.setOutput("name", asset.name);
    core.setOutput("url", asset.url);
  });
}

run();
