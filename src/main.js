const core = require("@actions/core");
const { GitHub } = require("@actions/github");

async function run() {
  const userName = core.getInput("user_name");
  const repoName = core.getInput("repo_name");

  core.warning(userName, repoName, process.env.GITHUB_TOKEN)
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
    core.setFailed(error.message)
  }
}

run();
