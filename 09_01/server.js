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

app.get('/messages/:user', (req, res) => {
  const { params } = req
  Message.find({ name: params.user }, (err, messages) => {
    res.send(messages)
  })
})

app.post('/messages', async (req, res) => {
  try {
    const message = new Message(req.body)
    await message.save()
    console.log('saved')

    const censored = await Message.findOne({ message: 'bitch' })
    if (censored) {
      await Message.deleteOne({ _id: censored.id })
    } else {
      io.emit('message', req.body)
    }

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
    console.error(error)
  } finally {
    console.log('message post called')
  }
})

io.on('connection',
  () => { console.log('a user connected...') })

mongoose.connect(dbUrl,
  { useNewUrlParser: true }, err => console.log('mongo db connection', err))

const server = http.listen(3000,
  () => console.log('Server is listening on:', server.address().port))
