const core = require("@actions/core");
const fs = require("fs");

const matchingRegex = new RegExp(core.getInput("matching_regex", { required: false }));

function run() {
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  let count = 0;
  let urls = "";
  releaseInfo.release.assets.forEach(asset => {
    // Only get the name if it is a .exe or .dmg
    if (matchingRegex && asset.name.match(matchingRegex)) return;
    if (count > 0) {
      urls.concat(",");
    }
    urls.concat(asset.browser_download_url);
    count++;
  });
  core.setOutput("urls", urls);
  core.setOutput("version", releaseInfo.release.name);
}

run();
