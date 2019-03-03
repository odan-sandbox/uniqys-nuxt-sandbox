import path from "path"
import express from "express"
import request from "request"
import bodyParser from "body-parser"
import api from "./api";
const { Nuxt } = require('nuxt')

const FRONTEND_DIR = path.join(__dirname, "../../frontend")
const APP_HOST = 'localhost'
const APP_PORT = 5650
const OUTER_API_HOST = '127.0.0.1'
const OUTER_API_PORT = 5651

const config = require(path.join(FRONTEND_DIR, './nuxt.config.ts'))
config.buildDir = path.join(FRONTEND_DIR, config.buildDir || '.nuxt')
// why
config.dev = false
console.log(config)
const nuxt = new Nuxt(config)

const app = express()

app.use(bodyParser())

app.get('/hello', function(_, res) {
    res.send('hello');
});

app.get('/uniqys/*', function(req, res) {
  console.log("proxy: ", req.path)
  const path = req.path.slice('/uniqys/'.length)
  console.log(path)
  request({
    uri: `http://${OUTER_API_HOST}:${OUTER_API_PORT}/${path}`,
    method: req.method,
    headers: req.headers,
  }).pipe(res)
})

app.use('/api', api)

app.use(nuxt.render)

console.log(`start listen: ${APP_HOST}:${APP_PORT}`)
app.listen(APP_PORT, APP_HOST);