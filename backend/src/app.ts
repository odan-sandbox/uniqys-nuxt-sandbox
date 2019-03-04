import path from "path"
import express from "express"
import bodyParser from "body-parser"
import proxy from "http-proxy-middleware"
import api from "./api";
const { Nuxt } = require('nuxt')

const FRONTEND_DIR = path.join(__dirname, "../../frontend")
const APP_HOST = '0.0.0.0'
const APP_PORT = 5650
const OUTER_API_HOST = '127.0.0.1'
const OUTER_API_PORT = 5651

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
  target: `http://${OUTER_API_HOST}:${OUTER_API_PORT}`,
  pathRewrite: {
    '^/uniqys': ''
  }
}))

app.use('/api', api)

app.use(nuxt.render)

console.log(`start listen: ${APP_HOST}:${APP_PORT}`)
app.listen(APP_PORT, APP_HOST);