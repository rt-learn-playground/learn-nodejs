/**
 * Run with: node sync-demo.js
 * @type {[type]}
 */
fs = require('fs')

data = fs.readdirSync('/Users/royce/Desktop')

console.log('data:', data)
console.log('This comes after')
