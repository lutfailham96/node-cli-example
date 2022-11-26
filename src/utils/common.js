const fs = require('fs');

/**
 * @type {{json: string, text: string}}
 */
const inputType = {
  json: "json",
  text: "text",
}

/**
 * Check file existence
 * @param file {string}
 * @return {boolean}
 */
const isFileExist = (file) => {
  try {
    return fs.existsSync(file)
  } catch(err) {
    console.error(err)
    return false;
  }
}

/**
 * Proceed input file
 * @param fileType {string}
 * @param inFile {string}
 * @param outFile {string}
 */
const proceedFile = (fileType, inFile, outFile) => {
  // proceed json file
  if (fileType === inputType.json) {
    console.log("Im processing json file")
  }

  // proceed text file
  if (fileType === inputType.text) {
    console.log("Im processing text file")
  }

  // save proceeded file below
  console.log("Im saving proceeded file to:", outFile)
}

module.exports = {
  inputType,
  isFileExist,
  proceedFile
}
