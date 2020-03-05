const core = require("@actions/core");
const fs = require("fs");

function run() {
  core.debug(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));

  releaseInfo.release.assets.forEach(asset => {
    console.log(asset.name, asset.browser_download_url)
  });
}

run();
