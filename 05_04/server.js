const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(__dirname))
app.use(bodyParser.json())

const messages = [
  { name: 'Tim', message: 'Hi' },
  { name: 'Jane', message: 'Hello' },
]

app.get('/messages', (req, res) => {
  res.send(messages)
})

app.post('/messages', (req, res) => {
  messages.push(req.body)
  res.sendStatus(200)
})

const server = app.listen(3000, () => {
  console.log('Server is listening on:', server.address().port)
})
