const core = require("@actions/core");
const fs = require("fs");

function run() {
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));

  let count = 0;
  let urls = "";

  releaseInfo.release.assets.forEach(asset => {
    if (count > 0) {
      urls = `${urls},`;
    }
    urls = `${urls}${asset.browser_download_url}`;
    count++;
  });
  core.setOutput("urls", urls);
  core.setOutput("version", releaseInfo.release.name);
}

exports.run = run;

run();
