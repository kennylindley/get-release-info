const core = require("@actions/core");
const { GitHub } = require("@actions/github");

async function run() {
  const userName = core.getInput("user_name");
  const repoName = core.getInput("repo_name");

  try {
    const github = new GitHub(process.env.GITHUB_TOKEN)
    const releaseResponse = await github.repos.getLatestRelease(
      userName,
      repoName
    );

    core.debug(releaseResponse);
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
