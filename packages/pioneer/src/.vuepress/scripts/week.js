const {resolve} = require("path");
const {existsSync, lstatSync, readdirSync} = require("fs");

function readWeekFileList(year) {
  const fileList = [];
  const dirPath = resolve(`./src/week/${year}`);
  const isDir = existsSync(dirPath) && lstatSync(dirPath).isDirectory();
  if (!isDir) {
    return fileList;
  }

  const files = readdirSync(dirPath);
  files.forEach(item => {
    const currentFile = item.slice(0, 2);
    fileList.push([
      `/week/${year}/${currentFile}`,
      `${year} Week ${currentFile}`,
    ]);
  });
  return fileList.reverse();
}

module.exports = readWeekFileList;
