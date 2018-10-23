var fs = require('fs')
var data = require('./data.json')

console.log('1: ', data.name)

// Using anonymous function
fs.readFile('./data.json', 'utf-8', (error, da2a) => {
    var json = JSON.parse(da2a);
    console.log('2: ', json.name)
})
