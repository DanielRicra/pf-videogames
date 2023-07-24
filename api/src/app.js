const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const http = require('http')
const { Server } = require('socket.io')

const routes = require('./routes/index')
const socket = require('./socket')

const app = express()
const server = http.createServer(app)

app.name = 'API'

// Socket Io Connection
const io = new Server(server, {
  cors: {
    origin: 'https://pf-videogames.vercel.app',
  },
})

socket(io)

// Middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
app.use(express.json())

// Routing
app.use('/', routes)

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = { server, io }
