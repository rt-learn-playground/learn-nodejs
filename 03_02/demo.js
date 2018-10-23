var fs = require('fs')

fs.readdir('/Users/royceremulla/Desktop', (err, data) => {
    console.log(data)
})
