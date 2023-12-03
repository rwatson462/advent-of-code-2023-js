const fs = require('fs');

export const readfile = filename => fs.readFileSync(filename, {encoding: 'utf-8'}).split("\n");