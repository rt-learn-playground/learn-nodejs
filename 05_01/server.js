const express = require('express')

const app = express()

app.use(express.static(__dirname))

const server = app.listen(3000, () => {
    console.log('Server is listening on:', server.address().port)
})
