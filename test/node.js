const fs = require('fs');
const path = require('path');

const tpl = require('../src/mini-tpl.js');

let content = fs.readFileSync(path.join(__dirname, 'node.html'), 'utf-8');
let data = [
    {
        name: 'tom',
        age: 12
    }, {
        name: 'lily',
        age: 24
    }, {
        name: 'lucy',
        age: 55
    }
];

console.log(tpl(data, content));