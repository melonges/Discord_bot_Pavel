import path from 'path';
import fs from 'fs';

function getBanList(): undefined | string[] {
  const rootPath = path.resolve(__dirname, "../")
  console.log(rootPath)
  const banListPath = path.resolve(rootPath, 'banlist.json');
  try {
    return JSON.parse(fs.readFileSync(banListPath).toString());
  } catch (e) {
    console.error('Error caused in getBanList restarting function', e);
    fs.writeFileSync(banListPath, '[]');
    getBanList();
  }
}

export default getBanList;