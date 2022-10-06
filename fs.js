const fs = require('fs');

const contents = fs.readFileSync("file.txt");

console.log(contents.toString());