/**
 * Run with: node async-demo.js
 * @type {[type]}
 */

fs = require('fs')

function phoneNumber(err, data) {
    console.log('data:', data)
}

fs.readdir('/Users/royce/Desktop', phoneNumber)

console.log('This comes before')
