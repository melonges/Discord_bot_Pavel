import path from 'path';
import fs from 'fs';

function getBanList() {
  const banListPath = path.resolve(__dirname, './banlist.json');
  try {
    return JSON.parse(fs.readFileSync(banListPath).toString());
  } catch (e) {
    console.error('Error caused in getBanList restarting function', e);
    fs.writeFileSync(banListPath, '[]');
    getBanList();
  }
}

export default getBanList;