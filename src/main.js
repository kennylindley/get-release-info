const core = require("@actions/core");
const { GitHub } = require("@actions/github");

async function run() {
  const userName = core.getInput("user_name", {required: true});
  const repoName = core.getInput("repo_name", {required: true});

  try {
    const github = new GitHub(process.env.GITHUB_TOKEN)
    const releaseResponse = await github.repos.getLatestRelease(
      {
        owner: userName,
        repo: repoName
      }
    );
    core.debug(releaseResponse);
  } catch (error) {
    core.debug(error);
    core.setFailed(`${error.message}, ${userName}, ${repoName}, ${process.env.GITHUB_TOKEN}`)
  }
}

run();
