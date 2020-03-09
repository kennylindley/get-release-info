const core = require("@actions/core");
const fs = require("fs");

function run() {
  const releaseInfo = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  console.log(releaseInfo.release.assets);
  let count = 0;
  let urls = "";
  releaseInfo.release.assets.forEach(asset => {
    if (count > 0) {
      urls.concat(",");
    }
    urls.concat(asset.browser_download_url);
    count++;
    console.log(urls, count);
  });
  core.setOutput("urls", urls);
  core.setOutput("version", releaseInfo.release.name);
}

run();
