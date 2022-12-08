import fs from 'fs';
let chunks = fs.readdirSync(__dirname + '/../recordings').sort((a, b) => { return a - b; }),
inputStream,
currentfile,
outputStream = fs.createWriteStream(__dirname + '/../recordings/merge.pcm');


const appendFiles = () => {
if (!chunks.length) {
    outputStream.end(() => console.log('No files to merge or merge complete'));
    process.exit();
}

currentfile = `${__dirname}/../recordings/` + chunks.shift();
inputStream = fs.createReadStream(currentfile);
inputStream.pipe(outputStream, { end: false });
inputStream.on('end', () => {
    console.log(currentfile + ' appended');
    appendFiles();
})}