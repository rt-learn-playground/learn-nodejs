const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbUrl = 'mongodb://user:abc123@ds139193.mlab.com:39193/learning-node'

const Message = mongoose.model('Message', {
  name: String,
  message: String,
})

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
})

app.post('/messages', (req, res) => {
  const message = new Message(req.body)

  message.save()
    .then(() => Message.findOne({ message: 'bitch' })
      .then((censored) => {
        if (censored) {
          console.log('censored words found: ', censored)
          return Message.deleteOne({ _id: censored.id })
        }
        io.emit('message', req.body)
        res.sendStatus(200)
        return Promise.resolve
      })
      .catch((err) => {
        res.sendStatus(500)
        return console.error(err)
      }))
})

io.on('connection',
  () => { console.log('a user connected...') })

mongoose.connect(dbUrl,
  { useNewUrlParser: true }, err => console.log('mongo db connection', err))

const server = http.listen(3000,
  () => console.log('Server is listening on:', server.address().port))
