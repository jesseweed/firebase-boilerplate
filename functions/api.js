/* eslint-disable no-unused-vars */
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// IMPORTS
const compression    = require('compression')
const colors         = require('colors')
const cors           = require('cors')
const emoji          = require('node-emoji')
const express        = require('express')
const favicon        = require('serve-favicon')
const fs             = require('fs')
const logger         = require('morgan')
const spdy           = require('spdy')
const path           = require('path')
const helmet         = require('helmet')

// CONSTANTS
const app            = express()
const ROOT           = path.resolve(__dirname, '../')
const ENV            = process.env.NODE_ENV || 'production'
const PORT           = process.env.PORT || '1981'

let PUBLIC = `${ROOT}/public`
if (ENV === 'development') PUBLIC = `${ROOT}/static`

app.use(compression())
app.use(cors())
app.use(helmet())
app.use(logger('dev'))
app.disable('x-powered-by')
app.use(express.static(PUBLIC))

try {
  app.use(favicon(`${PUBLIC}/favicon.png`))
} catch (e) {
  console.error(e)
}

// ROUTES
app.get('/api/:method?/:param?', (req, res) => {
  res.send({
    params: req.params
  })
})

app.get('*', (req, res) => {
  res.send('No soup for you!')
})

if (ENV === 'development') {

  app.locals.pretty = true

  spdy.createServer({
    key: fs.readFileSync(`${ROOT}/localhost+1-key.pem`),
    cert: fs.readFileSync(`${ROOT}/localhost+1.pem`)
  }, app).listen(PORT, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    }

    const host = `https://localhost:${PORT}`.blue

    return console.log(`\n${emoji.get('rocket')}  Node server started at ${host}\n`)
  })

} else {
  module.exports = app
}
