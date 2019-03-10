import path from "path"
import express from "express"
import bodyParser from "body-parser"
import proxy from "http-proxy-middleware"
import api from "./api";
const { Nuxt } = require('nuxt')

const FRONTEND_DIR = path.join(__dirname, "../../frontend")
const APP_HOST = process.env.EASY_APP_HOST
const APP_PORT = process.env.EASY_APP_PORT
const EASY_API_HOST = process.env.EASY_API_HOST
const EASY_API_PORT = process.env.EASY_API_PORT

console.log("poyo")
process.stdout.write("poyo\n")

const config = require(path.join(FRONTEND_DIR, './nuxt.config.ts')).default
config.buildDir = path.join(FRONTEND_DIR, config.buildDir || '.nuxt')
// why
config.dev = false
const nuxt = new Nuxt(config)

const app = express()

app.use(bodyParser())

app.get('/hello', function(_, res) {
    res.send('hello');
});

app.get('/uniqys/*', proxy({
  target: `http://${EASY_API_HOST}:${EASY_API_PORT}`,
  pathRewrite: {
    '^/uniqys': ''
  }
}))

app.use('/api', api)

app.use(nuxt.render)

console.log(`start listen: ${APP_HOST}:${APP_PORT}`)
app.listen(APP_PORT, APP_HOST);