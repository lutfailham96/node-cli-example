const fs = require('fs');
const readline = require('readline');

/**
 * @type {{json: string, text: string}}
 */
const inputType = {
  json: 'json',
  text: 'text',
};

/**
 * Check file existence
 * @param file {string}
 * @return {boolean}
 */
const isFileExist = (file) => {
  try {
    return fs.existsSync(file);
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Read file lines
 * @param inFile {string}
 * @return {Promise<*[]>}
 */
const readFileLines = async (inFile) => {
  const fileStream = fs.createReadStream(inFile);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const arrData = [];
  for await (const line of rl) {
    arrData.push(line);
  }

  return arrData;
};

/**
 * Write buffer to file
 * @param filePath {string}
 * @param data {string | NodeJs.ArrayBufferView}
 */
const writeFile = (filePath, data) => {
  fs.writeFileSync(filePath, data);
};

/**
 * Proceed input file
 * @param fileType {string}
 * @param inFile {string}
 * @param outFile {string}
 */
const proceedFile = async (fileType, inFile, outFile) => {
  // proceed json file
  let resData;
  if (fileType === inputType.json) {
    console.log('Converting to JSON file');
    const arrData = await readFileLines(inFile);
    resData = [];
    for (const line of arrData) {
      const lsd = line.split(' ');
      const remote_addr = lsd[0];
      const remote_user = lsd[2];
      const time_local = `${lsd[3]} ${lsd[4]}`;
      const request = `${lsd[5]} ${lsd[6]} ${lsd[7]}`.replaceAll('"', '');
      const status = parseInt(lsd[8]);
      const body_bytes_sent = parseInt(lsd[9]);
      const http_referer = lsd[10].replaceAll('"', '');
      const http_user_agent = line.split('"')[5];
      const gzip_ratio = line.split('" ')[3].replaceAll('"', '');
      const ld = {
        remote_addr,
        remote_user,
        time_local,
        request,
        status,
        body_bytes_sent,
        http_referer,
        http_user_agent,
        gzip_ratio,
      };
      resData.push(ld);
    }
    resData = JSON.stringify(resData, null, 2);
  }

  // proceed text file
  if (fileType === inputType.text) {
    console.log('Converting to text file');
    const jsonData = JSON.parse(fs.readFileSync(inFile).toString());
    resData = '';
    for (const line of jsonData) {
      resData += `${line.remote_addr} - ${line.remote_user} ${line.time_local} "${line.request}" ${line.status} ${line.body_bytes_sent} "${line.http_referer}" "${line.http_user_agent}" "${line.gzip_ratio}"\r\n`;
    }
  }

  // save proceeded buffer to file
  console.log(`Saving ${fileType} file proceeded to: ${outFile}`);
  writeFile(outFile, resData);
};

module.exports = {
  inputType,
  isFileExist,
  proceedFile,
  writeFile,
  readFileLines,
};
