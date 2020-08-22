const {resolve} = require("path");
const {existsSync, lstatSync, readdirSync} = require("fs");

function readDayFileList(year, moon) {
  const fileList = [];
  const dirPath = resolve(`./src/day/${year}/${moon}/`);
  const isDir = existsSync(dirPath) && lstatSync(dirPath).isDirectory();
  if (!isDir) {
    return fileList;
  }

  const files = readdirSync(dirPath);
  files.forEach(item => {
    const currentFile = item.slice(0, 2);
    fileList.push([
      `/day/${year}/${moon}/${currentFile}`,
      `${year}/${moon}/${currentFile}`,
    ]);
  });
  return fileList.reverse();
}

module.exports = readDayFileList;
