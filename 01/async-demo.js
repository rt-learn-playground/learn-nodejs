fs = require('fs')

function phoneNumber(err, data) {
    console.log('data:', data)
}

fs.readdir('/Users/royceremulla/Desktop', phoneNumber)

console.log('This comes before')
