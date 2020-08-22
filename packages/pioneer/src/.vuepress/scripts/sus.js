const {resolve} = require("path");
const {existsSync, lstatSync, readdirSync} = require("fs");

function readSusFileList(year) {
  const fileList = [];
  const dirPath = resolve(`./src/sus/${year}`);
  const isDir = existsSync(dirPath) && lstatSync(dirPath).isDirectory();
  if (!isDir) {
    return fileList;
  }

  const files = readdirSync(dirPath);
  files.forEach(item => {
    const currentFile = item.slice(0, 2);
    fileList.push([
      `/sus/${year}/${currentFile}`,
      `${year} Week ${currentFile}`,
    ]);
  });
  return fileList.reverse();
}

module.exports = readSusFileList;
