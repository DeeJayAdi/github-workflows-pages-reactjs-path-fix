const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");
const path = require("path");

try {
  const { GITHUB_WORKSPACE, GITHUB_REPOSITORY } = process.env;
  const defaultPath = core.getInput("build_path");
  const repoName = GITHUB_REPOSITORY.split("/").pop();
  const filePath = path.join(GITHUB_WORKSPACE, defaultPath, "index.html");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const findStringRegx = /\/static\//g;
  const replaceString = `/${repoName}/static/`;

  if (!fileContent.includes(replaceString)) {
    const newFileContent = fileContent.replace(findStringRegx, replaceString);

    fs.writeFile(filePath, newFileContent, (err) => {
      if (err) throw err;
    });

    console.log("File Modified!");
  } else {
    console.log("This file is fine :)");
  }
} catch (error) {
  core.setFailed(error.message);
}
