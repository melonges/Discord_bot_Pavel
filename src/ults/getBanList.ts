import path from 'path';
import fs from 'fs/promises';

async function getBanList(): Promise<undefined | string[]> {
  const rootPath = path.resolve(__dirname, "../")
  const banListPath = path.resolve(rootPath, 'banlist.json');
  try {
    return JSON.parse(await fs.readFile(banListPath, 'utf8'));
  } catch (e) {
    console.error('Error caused in getBanList restarting function', e);
    fs.writeFile(banListPath, '[]').then(getBanList)
  }
}

export default getBanList;