import express, { Application } from 'express'
import '@Utils/processes'
import http from 'http'
import { createHttpTerminator } from 'http-terminator'
import router from '@Routes/routes'
import bodyParser from 'body-parser'
import session from 'express-session'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import methodOverride from 'method-override'

// this loads env vars
const test = dotenv.config()
console.log(test)

// Create global app object
const app: Application = express()

app.use(cors())

// Normal express config defaults
// Logger
app.use(morgan('dev'))

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride())

app.use(express.static(`${__dirname}/public`))

app.use(
  session({
    secret: 'conduit',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
)

app.use(router)

const port = process.env.APP_PORT || 9000
export const server = http.createServer(app)
export const httpTerminator = createHttpTerminator({
  server,
})

// finally, let's start our server...
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
