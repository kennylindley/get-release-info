jest.mock("@actions/core");
jest.mock("fs");

const core = require("@actions/core");
const fs = require("fs");

describe("main#run", () => {
  let singleDownloadsUrlFileContents = '{"release":{"assets":[{"browser_download_url": "mock url 1"}],"name":"mock version"}}';
  let multipleDownloadsUrlFileContents = '{"release":{"assets":[{"browser_download_url": "mock url 1"},{"browser_download_url": "mock url 2"}],"name":"mock version"}}';

  beforeEach(() => {
    fs.readFileSync = jest.fn();
    core.setOutput = jest.fn();
  });

  afterEach(() => {
    fs.readFileSync.mockRestore();
  });

  it("calls setOutput for url and version for a single file", () => {
    fs.readFileSync.mockReturnValue(singleDownloadsUrlFileContents);
    const { run } = require("../src/main.js");

    core.setOutput.mockRestore();
    run();

    expect(core.setOutput.mock.calls).toEqual([
      ["urls", "mock url 1"],
      ["version", "mock version"]
    ]);
  });

  it("calls setOutput for url and version for multiple files", () => {
    fs.readFileSync.mockReturnValue(multipleDownloadsUrlFileContents);
    const { run } = require("../src/main.js");

    core.setOutput.mockRestore();
    run();

    expect(core.setOutput.mock.calls).toEqual([
      ["urls", "mock url 1,mock url 2"],
      ["version", "mock version"]
    ]);
  });
});
